const { promises: fs } = require("fs");

const path = require("path");

const basePath = path.join(__dirname, "../storage/files/");

module.exports = {
  read: async function(filePath) {
    const data = await fs.readFile(filePath);
    return new Buffer(data);
  },
  write: async function(filePath, data) {
    return fs.writeFile(filePath, data);
  },
  makePath: function(userPath, username) {
    return path.join(basePath, username, userPath);
  },
  makeDir: async function(filePath) {
    let dirPath = path.dirname(filePath);
    console.log(dirPath);
    return fs.mkdir(dirPath, { recursive: true });
  }
};
