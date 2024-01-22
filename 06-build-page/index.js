const { copyDir } = require("../04-copy-directory/index.js");
const { mergeStyles } = require("../05-merge-styles/index.js");

const fs = require("node:fs");
const path = require("node:path");

const dist = path.join(__dirname, "project-dist");
const componentsFolder = path.join(__dirname, "components");

fs.rm(dist, { recursive: true, force: true }, (err) => {
  if (err) throw err;
  fs.mkdir(dist, { recursive: true }, (err) => {
    if (err) throw err;
    replaceHtmlTemplates()
    copyDir(path.join(__dirname, "assets"), path.join(dist, "assets"));
    mergeStyles(path.join(__dirname, "styles"), `${dist}/style.css`);
  });
});

function replaceHtmlTemplates() {
  let template;

  fs.readFile(path.join(__dirname, "template.html"), (err, data) => {
    if (err) throw err;
    template = data.toString();

    fs.readdir(componentsFolder, { withFileTypes: true }, (err, files) => {
      if (err) throw err;
      files.forEach(file => {
        if (path.extname(file.name) === ".html") {
          fs.readFile(path.join(componentsFolder, file.name), (err, data) => {
            if (err) throw err;
            const component = data.toString();
            template = template.replace(`{{${path.basename(file.name, ".html")}}}`, component);

            fs.writeFile(path.join(dist, "index.html"), template, (err) => {
              if (err) throw err;
            });

          })
        }
      });
    });

  });

}