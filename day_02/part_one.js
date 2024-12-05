const fs = require("node:fs");
const inputList = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n")
  .map((item) => item.split(" "));

const apRatio = (arr) => {
  let lastDiff = arr[1] - arr[0];
  try {
    for (let i = 1; i < arr.length; i++) {
      const diff = arr[i] - arr[i - 1];
      const absDiff = Math.abs(diff);
      if (absDiff < 1 || absDiff > 3) {
        throw new Error();
      }
      if (i > 1) {
        if (diff * lastDiff < 0) {
          throw new Error();
        }
        lastDiff = diff;
      }
    }
    return 1;
  } catch {
    return 0;
  }
};

console.log(inputList.reduce((acc, curr) => (acc += apRatio(curr)), 0));
