import { existsSync, mkdirSync } from "node:fs";
import { chmod } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { getSystemConfig } from "./ensure/config.js";
import { download } from "./ensure/download.js";
import { extractTarGz } from "./ensure/tar.js";
import type { EnsureOptions } from "./ensure/types.js";

export const ensure = async (options: EnsureOptions): Promise<void> => {
	const dir = resolve(options.dir);
	const { platform: targetPlatform, config } = getSystemConfig(
		options.platform,
	);
	const binary = join(dir, config.binary);

	if (!options.force && existsSync(binary)) {
		console.log(
			`Server binary already present at ${binary}. Use --force to re-download.`,
		);
		return;
	}

	mkdirSync(dir, { recursive: true });

	console.log(`🔒 Ensuring to \`${dir}\`...`);

	if (config.files.length === 1 && config.files[0]?.endsWith(".tar.gz")) {
		const archiveFile = config.files[0];
		const archivePath = join(tmpdir(), `ragepkg-${archiveFile}`);
		await download(config.baseUrl, [archiveFile], tmpdir());
		await extractTarGz(archivePath, dir);
	} else {
		await download(config.baseUrl, config.files, dir);
	}

	if (targetPlatform === "linux") {
		await chmod(binary, 0o755);
	}

	console.log(`🔒 Ensured to \`${dir}\`. Binary available at: \`${binary}\``);
};
