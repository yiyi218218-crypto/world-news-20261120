import { copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// Destination directory configured via environment variable MAKEFUN_OUTPUT_DIR
const outputDirectory = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const targetFilePath = join(outputDirectory, 'entry.png');
const sourceFileUrl = new URL('./entry.png', import.meta.url);

// Copy validated 20 November 2026 world news summary infographic
copyFileSync(sourceFileUrl, targetFilePath);

