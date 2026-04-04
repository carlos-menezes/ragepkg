import { spawn } from "node:child_process";

export async function extractTarGz(
	archivePath: string,
	destDir: string,
): Promise<void> {
	return new Promise((resolve, reject) => {
		const child = spawn(
			"tar",
			["-xzf", archivePath, "--strip-components=1", "-C", destDir],
			{ stdio: "inherit" },
		);

		child.on("close", (code) => {
			if (code === 0) {
				resolve();
			} else {
				reject(new Error(`\`tar\` exited with code ${code ?? "unknown"}`));
			}
		});

		child.on("error", reject);
	});
}
