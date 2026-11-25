import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Two Lines to Your Past Self — u-suga-two-lines-to-your-past-self-f36c83ca
// Gate: /output/entry.txt must be UTF-8 text of 1 to 280 characters.
const MAX_CHARS = 280;

const ENTRY = [
  // Line 1 warns the past self about one specific moment (the 3 April
  // phone call); line 2 says why it mattered (the last time he asked).
  "When your father calls on 3 April and asks if you're coming home for Eid, don't say \"next year\" — get on the night bus instead.",
  "That \"next year\" was the last time he ever asked, and you've been buying bus tickets to an empty house ever since.",
].join("\n");

const content = ENTRY + "\n";

// The judge reads exactly two lines: one warning, one reason. Refuse to
// emit anything else, so a future edit to ENTRY cannot silently break the
// shape the gate and the judge expect.
const lines = ENTRY.split("\n");
if (lines.length !== 2 || lines.some((l) => l.trim().length === 0)) {
  throw new Error(`entry must be exactly 2 non-empty lines, got ${lines.length}`);
}
if (lines.some((l) => l.split(/[.!?]\s/).length > 1 && /[.!?]\s\S/.test(l))) {
  throw new Error("each line must be a single sentence");
}

if (content.length > MAX_CHARS) {
  throw new Error(`entry too long: ${content.length} chars (max ${MAX_CHARS})`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), content, "utf8");
console.log(`wrote entry.txt (${content.length} chars)`);
