export type SupportedPlatform = "linux" | "windows";

export interface EnsureOptions {
	dir: string;
	platform: string;
	force: boolean;
}

export interface SystemConfig {
	baseUrl: string;
	files: string[];
	binary: string;
}
