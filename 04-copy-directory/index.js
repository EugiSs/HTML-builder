const fs = require("node:fs");
const srcPath = `${__dirname}/files/`;
const distPath = `${__dirname}/files-copy`;

if (require.main === module) {
  init();
}

function init() {
  copyDir(srcPath, distPath);
}

function copyDir(src, dist) {
  fs.rm(dist, { recursive: true, force: true }, (err) => {
    if (err) throw err;
    copy(src, dist);
  })
}

function copy(src, dist) {
  fs.mkdir(`${dist}`, { recursive: true }, (err) => {
    if (err) throw err;
    fs.readdir(src, { withFileTypes: true }, (err, files) => {
      if (err) throw err;
      files.forEach(file => {
        if (file.isFile()) {
          fs.copyFile(`${src}/${file.name}`, `${dist}/${file.name}`, (err) => {
            if (err) throw err;
          })
        } else {
          copy(`${src}/${file.name}`, `${dist}/${file.name}`);
        }
      })
    })
  })
}

module.exports = { copyDir };