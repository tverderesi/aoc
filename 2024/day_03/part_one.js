const fs = require("node:fs");
const inputList = fs.readFileSync("input.txt").toString();

const findRegex = /mul\((\d+),(\d+)\)/g;
const matches = Array.from(inputList.matchAll(findRegex)).map((match) => [
  match[1],
  match[2],
]);

console.log(matches.reduce((acc, curr) => (acc += curr[0] * curr[1]), 0));
