const fetchInput = require("../../util/fetchInput");
const splitIntoGrid = require("../../util/splitIntoGrid");

const applyRule = (array) => {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] === "0") {
      newArray.push("1");
    } else if (array.length > 1 && array[i].length % 2 === 0) {
      const pivot = Math.floor(array[i].length / 2);
      const firstHalf = array[i].toString().substring(0, pivot);
      const secondHalf = array[i].toString().substring(pivot);
      const secondHalfWithoutLeadingZeroes = secondHalf.replace(/^0+(?!$)/, "");
      newArray.push(firstHalf, secondHalfWithoutLeadingZeroes);
    } else {
      newArray.push(String((array[i] *= 2024)));
    }
  }
  return newArray;
};

const main = (input, iterations) => {
  const initialArray = splitIntoGrid(fetchInput(input))[0];
  let currentArr = initialArray;
  for (let iteration = 0; iteration < iterations; iteration++) {
    currentArr = applyRule(currentArr);
  }
  return currentArr.length;
};

console.log(main("test.txt", 25));
