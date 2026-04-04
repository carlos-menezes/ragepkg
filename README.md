# `ragepkg`

[![asciicast](https://asciinema.org/a/899533.svg)](https://asciinema.org/a/899533)

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
ragepkg <command> [options]
```

### `ensure`

Downloads RageMP server binaries into a target directory. Downloaded files are cached under `~/.cache/ragepkg/<platform>/` (by default) and reused on subsequent runs. If a cached file's size differs from the remote, a warning is printed suggesting `--force`.

**Options:**

| Flag | Description | Default |
|------|-------------|---------|
| `-d, --dir <directory>` | Directory to place server files in | `process.cwd()` |
| `-p, --platform <platform>` | Target platform: `auto`, `linux`, `windows` | `auto` |
| `-f, --force` | Skip cache and re-download even if binaries already exist | `false` |
| `-c, --cache <directory>` | Override the cache directory | `~/.cache/ragepkg/<platform>` |

**Examples:**

```sh
# Download server files for the current platform into ./server
ragepkg ensure --dir ./server

# Force re-download for Linux into a specific directory
ragepkg ensure --dir ./server --platform linux --force
```

### `clean`

Removes RageMP server binaries from a target directory for the given platform.

**Options:**

| Flag | Description | Default |
|------|-------------|---------|
| `-d, --dir <directory>` | Directory containing the server files | `process.cwd()` |
| `-p, --platform <platform>` | Target platform: `auto`, `linux`, `windows` | `auto` |

**Examples:**

```sh
# Remove server files for the current platform
ragepkg clean --dir ./server

# Remove Linux server files from a specific directory
ragepkg clean --dir ./server --platform linux
```