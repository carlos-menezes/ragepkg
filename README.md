# ragepkg

A CLI tool to download and set up [RageMP](https://rage.mp/) server binaries for GTA V multiplayer server development.

## Requirements

- Node.js v24.14.1
- pnpm v10.33.0

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
| `-d, --dir <directory>` | Directory to place server files in | Current working directory |
| `-p, --platform <platform>` | Target platform: `auto`, `linux`, `windows` | `auto` |
| `-f, --force` | Re-download even if binaries already exist | `false` |

**Examples:**

```sh
# Download server files for the current platform into ./server
ragepkg ensure --dir ./server

# Force re-download for Linux into a specific directory
ragepkg ensure --dir ./server --platform linux --force
```

## Development

```sh
# Build
pnpm build

# Lint
pnpm lint

# Format
pnpm format
```
