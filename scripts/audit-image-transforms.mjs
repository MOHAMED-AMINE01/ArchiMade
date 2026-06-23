/**
 * Static audit: bitmap upscale patterns on ResponsiveImage / image refs.
 * Exit 1 on any FAIL. Kept permanently (see CLAUDE.md).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const landingPath = join("src", "components", "ArchiMadeLanding.tsx");
const landing = readFileSync(landingPath, "utf8");
const lines = landing.split("\n");

let fail = 0;

const failMsg = (m) => {
  console.log(`  FAIL  ${m}`);
  fail++;
};
const okMsg = (m) => console.log(`  OK    ${m}`);

console.log("\n== IMAGE TRANSFORM AUDIT ==\n");

if (/\.preloader-content[\s\S]{0,200}scale:\s*1\.[1-9]/.test(landing)) {
  failMsg(".preloader-content has scale > 1.0");
} else {
  okMsg(".preloader-content: no scale > 1.0");
}

const gsapBad =
  /imgRef\.current[\s\S]{0,120}scale:\s*1\.[2-9]/.test(landing) ||
  /heroImgRef\.current[\s\S]{0,120}scale:\s*1\.[2-9]/.test(landing) ||
  /preloader-logo[\s\S]{0,160}scale:\s*1\.[2-9]/.test(landing);
if (gsapBad) {
  failMsg("GSAP scale > 1.1 on imgRef / heroImgRef / preloader-logo");
} else {
  okMsg("GSAP image refs: no scale > 1.1");
}

// scale-100 is OK (1.0); fail upscale classes only
const upscaleClass = /scale-(10[5-9]|11|12|13|14|15|16|17|18|19|150)/;
let upscaleClassFail = false;
for (let i = 0; i < lines.length; i++) {
  if (!lines[i].includes("ResponsiveImage")) continue;
  const window = lines.slice(i, i + 8).join("\n");
  if (upscaleClass.test(window)) {
    failMsg(`ResponsiveImage upscale class near line ${i + 1}`);
    upscaleClassFail = true;
  }
}
if (!upscaleClassFail)
  okMsg("ResponsiveImage: no upscale Tailwind scale classes");

let h120Fail = false;
for (let i = 0; i < lines.length; i++) {
  if (!lines[i].includes("ResponsiveImage")) continue;
  const window = lines.slice(i, i + 8).join("\n");
  if (/h-\[120%\]/.test(window)) {
    failMsg(`ResponsiveImage h-[120%] near line ${i + 1}`);
    h120Fail = true;
  }
}
if (!h120Fail) okMsg("ResponsiveImage: no h-[120%]");

let motionScaleFail = false;
for (let i = 0; i < lines.length; i++) {
  if (!lines[i].includes("ResponsiveImage")) continue;
  const start = Math.max(0, i - 15);
  const block = lines.slice(start, i + 1).join("\n");
  const hasMotion = /motion\.div/.test(block);
  const initialScaleBelow1 =
    /initial=\{\{[^}]*scale:\s*0\.[0-9]+/.test(block) ||
    /initial:\s*\{[^}]*scale:\s*0\.[0-9]+/.test(block);
  const animatesTo1 =
    /animate=\{\{[^}]*scale:\s*1/.test(block) ||
    /animate:\s*\{[^}]*scale:\s*1/.test(block);
  if (hasMotion && initialScaleBelow1 && animatesTo1) {
    failMsg(
      `motion.div scale 0.x→1 ancestor of ResponsiveImage near line ${i + 1}`,
    );
    motionScaleFail = true;
  }
}
if (!motionScaleFail)
  okMsg("no motion.div scale-up on ResponsiveImage ancestors");

console.log(`\nSummary: ${fail} fail`);
if (fail > 0) process.exit(1);
