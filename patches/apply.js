const path = require("node:path");
const fs = require("node:fs");

const patchesDir = __dirname;
const targetDir = path.join(path.dirname(patchesDir), ".output", "public");
const patchDirectories = fs
  .readdirSync(patchesDir, { withFileTypes: true })
  .filter((dir) => dir.isDirectory())
  .map((dir) => path.join(patchesDir, dir.name));

patchDirectories.forEach((dir) => {
  fs.cpSync(dir, targetDir, {
    recursive: true,
    force: true,
    errorOnExist: false,
  });
});
