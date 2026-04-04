import { program } from "commander";
import pkgJson from "../package.json" with { type: "json" };
import { ensureCommand } from "./commands/ensure.js";

program
	.name("ragepkg")
	.description(
		"Multiplatform CLI tool to aid in downloading and managing RageMP server binaries",
	)
	.version(pkgJson.version);
program.addCommand(ensureCommand);

program.parse();
