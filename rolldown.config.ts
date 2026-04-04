import { defineConfig } from "rolldown";

export default defineConfig({
	input: "src/index.ts",
	output: {
		file: "dist/index.js",
		banner: "#!/usr/bin/env node",
	},
	platform: "node",
});
