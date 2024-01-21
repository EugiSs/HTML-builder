const fs = require("node:fs");
const folderPath = `${__dirname}/secret-folder/`;
const path = require("node:path");

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    if (file.isFile()) {
      fs.stat(`${folderPath}${file.name}`, (err, stats) => {
        if (err) throw err;
        let fileExtname = path.extname(file.name).replace(".", "");
        console.log(`${file.name} - ${fileExtname} - ${stats.size}bytes`);
      })
    }
  })
})