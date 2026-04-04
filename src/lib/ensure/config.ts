import { platform } from "node:os";
import type { SupportedPlatform, SystemConfig } from "./types.js";

const supportedPlatforms: Record<SupportedPlatform, SystemConfig> = {
	windows: {
		baseUrl: "https://cdn.rage.mp/updater/prerelease_server/server-files/",
		files: [
			"ragemp-server.exe",
			"BugTrap-x64.dll",
			"bin/bt.dat",
			"bin/enc.dat",
			"bin/loader.mjs",
		],
		binary: "ragemp-server.exe",
		cleanPaths: ["ragemp-server.exe", "BugTrap-x64.dll", "bin"],
	},
	linux: {
		baseUrl: "https://cdn.rage.mp/updater/prerelease_server/server-files/",
		files: ["linux_x64.tar.gz"],
		binary: "ragemp-server",
		cleanPaths: ["ragemp-server", "bin", "dotnet"],
	},
};

const isSupportedPlatform = (value: string): value is SupportedPlatform =>
	value in supportedPlatforms;

export function getSystemConfig(targetPlatform: string): {
	platform: SupportedPlatform;
	config: SystemConfig;
} {
	if (isSupportedPlatform(targetPlatform)) {
		return {
			platform: targetPlatform,
			config: supportedPlatforms[targetPlatform],
		};
	}

	if (targetPlatform !== "auto") {
		throw new Error(
			`Invalid platform '${targetPlatform}'. Use \`auto\`, \`linux\` or \`windows\`.`,
		);
	}

	const host = platform();
	if (host === "linux") {
		return { platform: "linux", config: supportedPlatforms.linux };
	}
	if (host === "win32") {
		return { platform: "windows", config: supportedPlatforms.windows };
	}

	throw new Error(
		"Host OS is unsupported. Use `--platform linux` or `--platform windows`.",
	);
}
