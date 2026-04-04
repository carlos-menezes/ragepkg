export type SupportedPlatform = "linux" | "windows";

export interface EnsureOptions {
	dir: string;
	platform: string;
	force: boolean;
	cache?: string;
}

export interface SystemConfig {
	baseUrl: string;
	files: string[];
	binary: string;
	cleanPaths: string[];
}

export interface CleanOptions {
	dir: string;
	platform: string;
}
