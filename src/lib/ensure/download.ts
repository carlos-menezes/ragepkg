import { createWriteStream, existsSync, mkdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import cliProgress from "cli-progress";
import prettyBytes from "pretty-bytes";

export async function download(
	baseUrl: string,
	files: string[],
	destDir: string,
	force = false,
): Promise<void> {
	for (const file of files) {
		const outputPath = join(destDir, file);
		mkdirSync(resolve(outputPath, ".."), { recursive: true });

		if (!force && existsSync(outputPath)) {
			const head = await fetch(`${baseUrl}${file}`, { method: "HEAD" });
			const remoteSize = Number(head.headers.get("content-length") ?? 0);
			const localSize = statSync(outputPath).size;
			if (remoteSize > 0 && remoteSize !== localSize) {
				console.warn(
					`⚠️  ${file} may be outdated (cached: ${prettyBytes(localSize)}, remote: ${prettyBytes(remoteSize)}). Use --force to re-download.`,
				);
			} else {
				console.log(`📦 ${file} (cached @ \`${outputPath}\`)`);
			}
			continue;
		}

		const response = await fetch(`${baseUrl}${file}`);
		if (!response.ok) {
			throw new Error(
				`Download failed: HTTP ${response.status} ${response.statusText}`,
			);
		}
		if (!response.body) {
			throw new Error("Response body is empty");
		}

		const progressBar = new cliProgress.SingleBar(
			{
				format: `➕ ${file} [{bar}] {percentage}% | {valuePretty}/{totalPretty}`,
				clearOnComplete: false,
				stopOnComplete: true,
			},
			cliProgress.Presets.rect,
		);
		const contentLength = Number(response.headers.get("content-length") ?? 0);
		progressBar.start(contentLength, 0);

		let downloaded = 0;
		const nodeStream = Readable.fromWeb(response.body);
		nodeStream.on("data", (chunk: Buffer) => {
			downloaded += chunk.length;
			progressBar.update(downloaded, {
				valuePretty: prettyBytes(downloaded),
				totalPretty: prettyBytes(contentLength),
			});
		});

		await pipeline(nodeStream, createWriteStream(outputPath));
	}
}
