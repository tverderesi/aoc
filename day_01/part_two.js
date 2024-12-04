const fs = require("node:fs");
const inputList = fs.readFileSync("input.txt").toString().split("\n");
const leftList = [];
const rightList = [];

inputList.map((item) => {
  [leftItem, rightItem] = item.split("   ");
  leftList.push(leftItem);
  rightList.push(rightItem);
});

const distances = leftList.reduce(
  (acc, curr) => acc + curr * rightList.filter((item) => item === curr).length,
  0
);

console.log(distances);
