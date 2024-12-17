const fs = require("fs");
console.log(
  fs
    .readFileSync("input.txt")
    .toString()
    .split("")
    .reduce((acc, curr, idx) => {
      if (curr === "(") {
        return (acc += 1);
      } else if (curr === ")") {
        return (acc -= 1);
      }
      return acc;
    }, 0)
);

console.log(
  fs
    .readFileSync("input.txt")
    .toString()
    .split("")
    .reduce((acc, curr, idx) => {
      if (acc < 0) {
        throw new Error(idx);
      }
      if (curr === "(") {
        return (acc += 1);
      } else if (curr === ")") {
        return (acc -= 1);
      }
      return acc;
    }, 0)
);
