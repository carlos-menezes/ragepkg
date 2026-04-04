import { Command } from "commander";
import { clean } from "../lib/clean.js";
import type { CleanOptions } from "../lib/ensure/types.js";

export const cleanCommand: Command = new Command("clean")
	.description("Removes RageMP server binaries from the target directory")
	.option(
		"-d, --dir <directory>",
		"Directory containing the server files",
		process.cwd(),
	)
	.option(
		"-p, --platform <platform>",
		"Target platform to clean (auto, linux, windows)",
		"auto",
	)
	.action((opts: CleanOptions) => {
		try {
			clean(opts);
		} catch (err) {
			console.error(`Error: ${(err as Error).message}`);
			process.exit(1);
		}
	});
