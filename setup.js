#!/usr/bin/env node

/**
 * ----------------------------------------------------------------------------
 * STUDIO HOTFIX: DEPENDENCY VERSION PINNING
 * ----------------------------------------------------------------------------
 * * ROLE: Principal Tooling Architect
 * * ISSUE: Tailwind v4 installed automatically (breaking change), causing PostCSS failure.
 * * DIAGNOSIS: "It looks like you're trying to use tailwindcss directly as a PostCSS plugin."
 * * FIX: Downgrade to Tailwind v3.4 (Stable) to match the project architecture.
 * * USAGE:
 * node fix-build.js
 * * ----------------------------------------------------------------------------
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const COLORS = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

const LOG_PREFIX = `${COLORS.cyan}[BUILD_FIX]${COLORS.reset}`;

function log(message, type = "info") {
  const icon = type === "success" ? "✔" : type === "error" ? "✖" : "➜";
  const color =
    type === "success"
      ? COLORS.green
      : type === "error"
        ? COLORS.red
        : COLORS.yellow;
  console.log(`${LOG_PREFIX} ${color}${icon}${COLORS.reset} ${message}`);
}

// ----------------------------------------------------------------------------
// CONFIGURATION RESTORATION
// ----------------------------------------------------------------------------

const POSTCSS_CONFIG_V3 = `
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
export default config;
`;

// ----------------------------------------------------------------------------
// MAIN EXECUTION
// ----------------------------------------------------------------------------

async function main() {
  console.clear();
  log("DETECTED TAILWIND VERSION MISMATCH...", "info");
  log(
    "Next.js 16+ defaults to Tailwind v4, but project uses v3 architecture.",
    "warn",
  );
  log("------------------------------------------------");

  const rootDir = process.cwd();
  const pkgJsonPath = path.join(rootDir, "package.json");

  // 1. CLEANUP: Remove conflicting versions
  log("Uninstalling Tailwind v4 packages...");
  try {
    execSync("npm uninstall tailwindcss @tailwindcss/postcss", {
      stdio: "inherit",
    });
  } catch (e) {
    // Ignore if not present
  }

  // 2. INSTALL: Pin to Stable v3.4.17
  log("Installing Tailwind CSS v3.4.17 (Stable)...");
  try {
    // Force specific versions known to work together
    execSync(
      "npm install -D tailwindcss@3.4.17 postcss@latest autoprefixer@latest",
      { stdio: "inherit" },
    );
    log("Dependencies pinned successfully.", "success");
  } catch (e) {
    log(
      "Failed to install dependencies. Check your internet connection.",
      "error",
    );
    process.exit(1);
  }

  // 3. RESTORE: Ensure PostCSS config matches v3
  // v4 uses '@tailwindcss/postcss', v3 uses 'tailwindcss'
  const postcssPath = path.join(rootDir, "postcss.config.mjs");
  fs.writeFileSync(postcssPath, POSTCSS_CONFIG_V3.trim());
  log("Restored postcss.config.mjs for v3 compatibility.", "success");

  // 4. CLEANUP: Clear Next.js Cache (Turbopack)
  // Turbopack caches build transforms, we need to flush them
  const nextFolder = path.join(rootDir, ".next");
  if (fs.existsSync(nextFolder)) {
    log("Flushing .next build cache...", "info");
    try {
      fs.rmSync(nextFolder, { recursive: true, force: true });
    } catch (e) {
      log(
        "Could not delete .next folder (locked?). Please delete manually if build fails.",
        "warn",
      );
    }
  }

  log("------------------------------------------------");
  log("FIX COMPLETE", "success");
  log("------------------------------------------------");
  log("The environment is now locked to Tailwind v3.4.");
  log("Run 'npm run dev' to start the studio.");
}

main();
