const fs = require("node:fs");
const inputList = fs.readFileSync("input.txt").toString().split("\n");
const leftList = [];
const rightList = [];

inputList.map((item) => {
  [leftItem, rightItem] = item.split("   ");
  leftList.push(leftItem);
  rightList.push(rightItem);
});

sortedLeftList = leftList.sort((a, b) => a - b);
sortedRightList = rightList.sort((a, b) => a - b);

const distances = sortedLeftList.reduce(
  (acc, curr, idx) => acc + Math.abs(curr - sortedRightList[idx]),
  0
);

console.log(distances);
