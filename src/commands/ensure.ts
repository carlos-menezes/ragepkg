import { Command } from "commander";
import { ensure } from "../lib/ensure.js";
import type { EnsureOptions } from "../lib/ensure/types.js";

export const ensureCommand: Command = new Command("ensure")
	.description("Ensures RageMP server binaries exist in the target directory")
	.option(
		"-d, --dir <directory>",
		"Directory to place the server files in",
		process.cwd(),
	)
	.option(
		"-p, --platform <platform>",
		"Target platform to fetch (auto, linux, windows)",
		"auto",
	)
	.option("-f, --force", "Re-download even if binaries already exist", false)
	.action(async (opts: EnsureOptions) => {
		try {
			await ensure(opts);
		} catch (err) {
			console.error(`Error: ${(err as Error).message}`);
			process.exit(1);
		}
	});
