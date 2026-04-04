import { mkdirSync } from "node:fs";
import { chmod, copyFile, mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { getCacheDir } from "./ensure/cache.js";
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

	mkdirSync(dir, { recursive: true });

	const cacheDir = options.cache
		? join(resolve(options.cache), targetPlatform)
		: getCacheDir(targetPlatform);
	mkdirSync(cacheDir, { recursive: true });
	console.log(`⏳ Ensuring to \`${dir}\`...`);

	if (config.files.length === 1 && config.files[0]?.endsWith(".tar.gz")) {
		const archiveFile = config.files[0];
		const archivePath = join(cacheDir, archiveFile);
		await download(config.baseUrl, [archiveFile], cacheDir, options.force);
		await extractTarGz(archivePath, dir);
	} else {
		await download(config.baseUrl, config.files, cacheDir, options.force);
		for (const file of config.files) {
			const destPath = join(dir, file);
			await mkdir(resolve(destPath, ".."), { recursive: true });
			await copyFile(join(cacheDir, file), destPath);
		}
	}

	if (targetPlatform === "linux") {
		await chmod(binary, 0o755);
	}

	console.log(`✅ Ensured to \`${dir}\`.`);
};
