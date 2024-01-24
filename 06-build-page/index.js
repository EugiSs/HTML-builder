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

const replaceHtmlTemplates = async () => {
  let templateData = await fs.promises.readFile(path.join(__dirname, "template.html"))
  let template = templateData.toString();
  const files = await fs.promises.readdir(componentsFolder, { withFileTypes: true });
  for (let file of files) {
    if (path.extname(file.name) === ".html") {
      let componentData = await fs.promises.readFile(path.join(componentsFolder, file.name))
      const component = componentData.toString();
      template = template.replace(`{{${path.basename(file.name, ".html")}}}`, component);

    }
  }
  await fs.promises.writeFile(path.join(dist, "index.html"), template);
}