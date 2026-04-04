import { program } from "commander";
import { ensureCommand } from "./commands/ensure.js";

program.addCommand(ensureCommand);

program.parse();
