const fs = require("node:fs")

const path = require("node:path")
const absPath = path.join(__dirname, "text.txt")

let stream = new fs.ReadStream(absPath)

stream.on("readable", function () {
  let data = stream.read()
  if (data) {
    console.log(data.toString());
  }
})
