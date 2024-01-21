const fs = require("node:fs");
const path = `${__dirname}/text.txt`;

const writer = fs.createWriteStream(path)

const process = require('node:process');
const readline = require('node:readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`Enter any text: `, text => {
  writer.write(text)
  process.on("exit", () => {
    console.log("Bye!");
    readline.close();
  })
});

readline.on("line", (text) => {
  writer.write(text)
})