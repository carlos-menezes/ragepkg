import { mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import type { SupportedPlatform } from "./types.js";

export function getRootCacheDir(): string {
	return join(homedir(), ".cache", "ragepkg");
}

export function getCacheDir(platform: SupportedPlatform): string {
	const dir = join(getRootCacheDir(), platform);
	mkdirSync(dir, { recursive: true });
	return dir;
}
