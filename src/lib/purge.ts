import { rmSync } from "node:fs";
import { resolve } from "node:path";
import { getRootCacheDir } from "./ensure/cache.js";

export interface PurgeOptions {
	cache?: string;
}

export const purge = (options: PurgeOptions): void => {
	const cacheDir = options.cache ? resolve(options.cache) : getRootCacheDir();
	rmSync(cacheDir, { recursive: true, force: true });
	console.log(`🗑️  Cache purged: \`${cacheDir}\``);
};
