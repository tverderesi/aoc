const fs = require("node:fs");
const test = fs.readFileSync("test.txt").toString().split("\n");
const input = fs.readFileSync("input.txt").toString().split("\n");

const buildXArrays = (input) => {
  const xArrays = [];
  for (let i = 1; i < input.length - 1; i++) {
    for (let j = 1; j < input[i].length - 1; j++) {
      const xArray = [
        input[i - 1][j - 1],
        input[i + 1][j - 1],
        input[i][j],
        input[i - 1][j + 1],
        input[i + 1][j + 1],
      ];
      xArrays.push(xArray.join(""));
    }
  }
  return xArrays;
};

const countValidStrings = (array) => {
  const validStrings = ["MMASS", "SSAMM", "MSAMS", "SMASM"];
  let i = 0;

  array.forEach((element) => {
    if (element.indexOf("X") > -1) {
      return;
    }
    if (element[2] !== "A") {
      return;
    }
    if (validStrings.indexOf(element) > -1) {
      i++;
    }
  });
  return i;
};

console.log(countValidStrings(buildXArrays(test)));
console.log(countValidStrings(buildXArrays(input)));
