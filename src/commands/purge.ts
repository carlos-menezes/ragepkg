import { Command } from "commander";
import { type PurgeOptions, purge } from "../lib/purge.js";

export const purgeCommand: Command = new Command("purge")
	.description("Removes all cached RageMP server files")
	.option(
		"-c, --cache <directory>",
		"Cache directory to purge (defaults to ~/.cache/ragepkg)",
	)
	.action((opts: PurgeOptions) => {
		try {
			purge(opts);
		} catch (err) {
			console.error(`Error: ${(err as Error).message}`);
			process.exit(1);
		}
	});
