const fetchInput = require("../../util/fetchInput");
const measureTime = require("../../util/measureTime");

const input = fetchInput("input.txt", "\n");

//part one

const mainOne = (input) => () =>
  input
    .map((item) => {
      const [l, w, h] = item.split("x");
      const dimensions = [l * w, w * h, h * l].sort((a, b) => a - b);
      return (
        dimensions.reduce((acc, item) => (acc += 2 * item), 0) + dimensions[0]
      );
    })
    .reduce((acc, curr) => (acc += curr), 0);

measureTime(mainOne(input), "partOne");

//part two
const mainTwo = (input) => () =>
  input
    .map((item) => {
      let ribbonLen = 0;
      const splitArr = item.split("x");
      ribbonLen = splitArr
        .sort((a, b) => a - b)
        .toSpliced(2, 1)
        .map((item) => 2 * item)
        .reduce((acc, curr) => (acc += curr), 0);
      const bowLen = splitArr.reduce((acc, curr) => (acc *= curr), 1);

      return ribbonLen + bowLen;
    })
    .reduce((acc, curr) => (acc += curr), 0);

measureTime(mainTwo(input), "partTwo");
