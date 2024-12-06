const fs = require("node:fs");
const test = fs.readFileSync("test.txt").toString().split("\n");
const input = fs.readFileSync("input.txt").toString().split("\n");

const countHorizontal = (input) => {
  return input.reduce(
    (acc, curr) =>
      (acc +=
        curr.matchAll("XMAS").toArray().length +
        curr.matchAll("SAMX").toArray().length),
    0
  );
};

const transposeArray = (input) => {
  newArr = [];
  for (let i = 0; i < input.length; i++) {
    newArr.push([]);
    for (let j = 0; j < input[i].length; j++) {
      newArr[i][j] = input[j][i];
    }
    newArr[i] = newArr[i].join("");
  }
  return newArr;
};

const diagonalArray = (input) => {
  const newArr = [];
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (!newArr[i + j]) {
        newArr[i + j] = [];
      }

      newArr[i + j].push(input[i][j]);
    }
  }
  return newArr.map((item) => item.join(""));
};

const reverseArray = (input) =>
  input.map((item) => item.split("").reverse().join(""));

const sumAll = (input) =>
  countHorizontal(input) +
  countHorizontal(transposeArray(input)) +
  countHorizontal(diagonalArray(input)) +
  countHorizontal(diagonalArray(reverseArray(input)));

console.log(sumAll(test));
console.log(sumAll(input));
