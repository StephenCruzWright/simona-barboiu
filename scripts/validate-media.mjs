import { readFile, access } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SEARCH_DIRS = ["app", "components"];
const FILE_EXTENSIONS = new Set([".tsx", ".ts", ".jsx", ".js"]);

async function walk(dir) {
  const entries = await import("node:fs/promises").then((fs) =>
    fs.readdir(dir, { withFileTypes: true }),
  );

  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }

    if (FILE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

function findStaticMedia(content) {
  const media = new Set();
  const regex = /src\s*=\s*["'](\/(?:[^"']+\.(?:webp|png|jpe?g|gif|avif|svg|mp4|webm)))["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    media.add(match[1]);
  }
  return [...media];
}

const missing = [];
for (const dir of SEARCH_DIRS) {
  const dirPath = path.join(ROOT, dir);
  const files = await walk(dirPath);
  for (const filePath of files) {
    const source = await readFile(filePath, "utf8");
    const found = findStaticMedia(source);

    for (const mediaPath of found) {
      const publicPath = path.join(ROOT, "public", mediaPath.slice(1));
      try {
        await access(publicPath);
      } catch {
        missing.push({ filePath: path.relative(ROOT, filePath), mediaPath });
      }
    }
  }
}

if (missing.length > 0) {
  console.error("Missing media assets detected:\n");
  for (const item of missing) {
    console.error(`- ${item.mediaPath} referenced in ${item.filePath}`);
  }
  process.exit(1);
}

console.log("All statically referenced media assets exist in /public.");
