const fs = require("node:fs");
const test = fs.readFileSync("test.txt").toString().split("\n");

const sanitizeInput = (input) => {
  return input.map((line) => {
    const [result, factorsString] = line.split(": ");
    const factorsArray = factorsString.split(" ");
    return [result].concat(factorsArray);
  });
};

const cumSum = (line) => line.slice(1).reduce((acc, curr) => (acc += curr), 0);
const cumMul = (line) => line.slice(1).reduce((acc, curr) => (acc *= curr), 1);
const isSum = (line) => line[0] === cumSum(line);
const isMultiplication = (line) => line[0] == cumMul(line);

const main = (input) => {
  const sanitizedInput = sanitizeInput(input);
  return sanitizedInput.reduce((acc, line) => {
    if (isSum(line)) return acc + Number(line[0]);
    if (isMultiplication(line)) return acc + Number(line[0]);
    if (line[0] > cumMul(line)) return acc;
    return acc;
  }, 0);
};

console.log(main(test));
