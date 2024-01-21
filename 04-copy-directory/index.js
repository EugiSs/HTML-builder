const fs = require("node:fs");
const srcPath = `${__dirname}/files/`;
const distPath = `${__dirname}/files-copy`;

copyDir(srcPath, distPath);

function copyDir(src, dist) {
  fs.mkdir(`${dist}`, { recursive: true }, (err) => {
    if (err) throw err;
  })

  fs.readdir(dist, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      fs.unlink(`${dist}/${file.name}`, (err) => {
        if (err) throw err;
      })
    })
  })

  fs.readdir(src, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      fs.copyFile(`${src}/${file.name}`, `${dist}/${file.name}`, (err) => {
        if (err) throw err;
      })
    })
  })
}
