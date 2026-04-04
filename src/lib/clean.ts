import { rmSync } from "node:fs";
import { join, resolve } from "node:path";
import { getSystemConfig } from "./ensure/config.js";
import type { CleanOptions } from "./ensure/types.js";

export const clean = (options: CleanOptions): void => {
	const dir = resolve(options.dir);
	const { config } = getSystemConfig(options.platform);

	console.log(`⏳ Removing server files from \`${dir}\`...`);
	for (const p of config.cleanPaths) {
		const target = join(dir, p);
		rmSync(target, { recursive: true, force: true });
		console.log(`➖ ${target}`);
	}

	console.log("✅ Cleaned server files.");
};
