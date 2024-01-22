const fs = require("node:fs");
const path = require("node:path");
const srcPath = `${__dirname}/styles/`;
const distPath = `${__dirname}/project-dist/bundle.css`;

if (require.main === module) {
  init();
}

function init() {
  mergeStyles(srcPath, distPath);
}

function mergeStyles(src, dist) {
  const writter = fs.createWriteStream(dist);

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

module.exports = { mergeStyles };