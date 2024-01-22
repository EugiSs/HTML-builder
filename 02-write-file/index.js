const fs = require("node:fs");
const path = `${__dirname}/text.txt`;

const writer = fs.createWriteStream(path)

const process = require('node:process');
const readline = require('node:readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

process.stdout.write("Hello!, Please, enter any text:\n");

readline.on("line", (text) => {
  text === "exit" ? closeApp() : writer.write(`${text}\n`);
});

readline.on("SIGINT", closeApp);

function closeApp() {
  process.stdout.write("\nThanks for using, goodbye!");
  readline.close();
}