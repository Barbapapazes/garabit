import { Buffer } from "node:buffer";
import { readFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import sharp from "sharp";

const ogSvg: string = readFileSync(
  join(".vitepress", "og-template.svg"),
  "utf-8",
);

/**
 * @credit Anthony Fu, https://antfu.me
 * @link https://github.com/antfu/antfu.me/blob/main/vite.config.ts#L242
 */
export async function genOg(title: string, output: string) {
  // Skip if the file already exists
  if (existsSync(output)) return;

  // Ensure the output directory exists
  mkdirSync(dirname(output), { recursive: true });

  // Break the title into lines of 30 characters
  const lines = title
    .trim()
    .split(/(.{0,30})(?:\s|$)/g)
    .filter(Boolean);

  const data: Record<string, string> = {
    line1: lines[0],
    line2: lines[1],
    line3: lines[2],
  };
  const svg = ogSvg.replace(/\{\{([^}]+)\}\}/g, (_, name) => data[name] || "");

  console.info(`Generating ${output}`);
  try {
    await sharp(Buffer.from(svg)).resize(1440, 810).png().toFile(output);
  } catch (e) {
    console.error("Failed to generate og image", e);
  }
}
