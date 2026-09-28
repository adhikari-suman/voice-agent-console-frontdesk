// Usage: node designs/_shared/shoot.mjs design-3 [page-name-filter]
// Renders every designs/<design>/src/NN-*.html at 1440x900 (2x) into designs/<design>/NN-*.png
import { spawn } from "node:child_process";
import { readdirSync, mkdtempSync, rmSync, existsSync, statSync, unlinkSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const [design, filter] = process.argv.slice(2);
if (!design) { console.error("usage: node shoot.mjs design-N [filter]"); process.exit(1); }
const src = join(root, design, "src");
if (!existsSync(src)) { console.error(`missing ${src}`); process.exit(1); }
const pages = readdirSync(src).filter(f => /^\d\d-.*\.html$/.test(f) && (!filter || f.includes(filter))).sort();
const sleep = ms => new Promise(r => setTimeout(r, ms));

// Chrome sometimes stays alive after writing the screenshot, so wait for a stable file and then kill it.
async function shoot(page) {
  const out = join(root, design, page.replace(/\.html$/, ".png"));
  if (existsSync(out)) unlinkSync(out);
  const profile = mkdtempSync(join(tmpdir(), "kiku-shoot-"));
  const chrome = spawn(CHROME, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--no-default-browser-check",
    `--user-data-dir=${profile}`, "--force-device-scale-factor=2", "--window-size=1440,900",
    "--virtual-time-budget=6000", "--run-all-compositor-stages-before-draw",
    `--screenshot=${out}`, "file://" + join(src, page),
  ], { stdio: "ignore" });
  let exited = false;
  chrome.on("exit", () => { exited = true; });
  let last = -1;
  for (let i = 0; i < 240; i++) {
    await sleep(250);
    if (existsSync(out)) {
      const size = statSync(out).size;
      if (size > 0 && size === last) break;
      last = size;
    } else if (exited) break;
  }
  if (!exited) chrome.kill("SIGKILL");
  await sleep(200);
  rmSync(profile, { recursive: true, force: true });
  console.log(existsSync(out) ? "shot" : "FAILED", join(design, page.replace(/\.html$/, ".png")));
}

for (const page of pages) await shoot(page);
