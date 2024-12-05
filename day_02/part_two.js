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
    return true;
  } catch {
    return false;
  }
};

const main = () => {
  const totalCorrectReports = inputList.reduce((acc, item) => {
    if (apRatio(item)) {
      acc += 1;
    } else {
      for (let i = 0; i < item.length; i++) {
        const newArr = item.toSpliced(i, 1);
        if (apRatio(newArr)) {
          acc += 1;
          break;
        }
      }
    }
    return acc;
  }, 0);
  console.log(totalCorrectReports);
};

main();
