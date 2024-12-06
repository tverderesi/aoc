const fs = require("node:fs");
const inputList = fs.readFileSync("input.txt").toString();

const splitInput = inputList.split("do()");
const doMuls = splitInput.map((item) => item.split("don't")[0]).join();
const findRegex = /mul\((\d+),(\d+)\)/g;
const matches = Array.from(doMuls.matchAll(findRegex)).map((match) => [
  match[1],
  match[2],
]);

console.log(matches.reduce((acc, curr) => (acc += curr[0] * curr[1]), 0));
