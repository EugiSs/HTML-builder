const fs = require("node:fs");
const path = require("node:path");
const srcPath = `${__dirname}/styles/`;
const distPath = `${__dirname}/project-dist`;

mergeStyles(srcPath, distPath);

function mergeStyles(src, dist) {
  const writter = fs.createWriteStream(`${dist}/bundle.css`);

  fs.readdir(src, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      if (file.isFile() && path.extname(file.name) === ".css") {
        fs.readFile(`${src}/${file.name}`, (err, data) => {
          if (err) throw err;
          writter.write(data.toString());
        })
      }
    })
  })
}