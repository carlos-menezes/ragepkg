import { spawn } from "node:child_process";

function spawnAsync(cmd: string, args: string[]): Promise<void> {
	return new Promise((resolve, reject) => {
		const child = spawn(cmd, args, { stdio: "inherit" });
		child.on("close", (code) => {
			if (code === 0) {
				resolve();
			} else {
				reject(new Error(`'${cmd}' exited with code ${code ?? "unknown"}`));
			}
		});
		child.on("error", reject);
	});
}

export async function extractTarGz(
	archivePath: string,
	destDir: string,
): Promise<void> {
	await spawnAsync("tar", [
		"-xzf",
		archivePath,
		"--strip-components=1",
		"-C",
		destDir,
	]);
}
