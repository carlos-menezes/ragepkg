# `ragepkg`

Multiplatform CLI tool to aid in developing [RageMP](https://rage.mp/) servers.

## Requirements

See `package.json` for specific versions.

- Node.js
- pnpm

## Installation

```sh
pnpm install
pnpm build
```

## Usage

```sh
ragepkg ensure [options]
```

### `ensure`

Downloads RageMP server binaries into a target directory. Skips the download if the server binary already exists, unless `--force` is used.

**Options:**

| Flag | Description | Default |
|------|-------------|---------|
| `-d, --dir <directory>` | Directory to place server files in | `process.cwd()` |
| `-p, --platform <platform>` | Target platform: `auto`, `linux`, `windows` | `auto` |
| `-f, --force` | Re-download even if binaries already exist | `false` |

**Examples:**

```sh
# Download server files for the current platform into ./server
ragepkg ensure --dir ./server

# Force re-download for Linux into a specific directory
ragepkg ensure --dir ./server --platform linux --force
```