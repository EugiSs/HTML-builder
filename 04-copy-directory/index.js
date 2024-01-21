const fs = require("node:fs");
const srcPath = `${__dirname}/files/`;

fs.mkdir(`${__dirname}/files-copy`, { recursive: true }, (err) => {
  if (err) {
    console.error(err)
  }
  fs.readdir(srcPath, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      fs.copyFile(`${srcPath}/${file.name}`, `${__dirname}/files-copy/${file.name}`, (err) => {
        if (err) {
          console.error(err)
        }
      })
    })
  })
})
