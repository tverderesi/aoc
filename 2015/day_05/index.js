const fs = require("fs");
const measureTime = require("../../util/measureTime");
const fetchInput = require("../../util/fetchInput");

const testJson = JSON.parse(fs.readFileSync("test.json").toString());
const testTwoJson = JSON.parse(fs.readFileSync("testTwo.json").toString());
const inputArray = fetchInput("input.txt", "\n");

const illegalSequences = ["ab", "cd", "pq", "xy"];
/**
 *
 * @param {String} string
 */
const checkLegalSequences = (string) =>
  illegalSequences
    .map((sequence) => string.includes(sequence))
    .every((item) => item === false);

/**
 *
 * @param {String} string
 */
const checkMinAmmountOfVowels = (string) => {
  const vowelMap = new Map([
    ["a", 0],
    ["e", 0],
    ["i", 0],
    ["o", 0],
    ["u", 0],
  ]);
  string.split("").forEach((letter) => {
    const value = vowelMap.get(letter);
    if (value !== undefined) {
      const newValue = value + 1;
      vowelMap.set(letter, newValue);
    }
  });
  return (
    vowelMap
      .values()
      .toArray()
      .reduce((acc, curr) => (acc += curr), 0) > 2
  );
};
/**
 *
 * @param {String} string
 */
const checkDoubleLetters = (string) => {
  const strArr = string.split("");
  for (i = 0; i < strArr.length - 1; i++) {
    if (strArr[i] === strArr[i + 1]) {
      return true;
    }
  }
  return false;
};

const testOne = (testJson) => () => {
  testJson.forEach(
    ({ string, doubleLetters, threeVowels, legalSequence }, idx) => {
      if (checkLegalSequences(string) !== legalSequence) {
        throw new Error(
          `Wrong check for checkLegalSequences! Expected: ${legalSequence}. Got: ${checkLegalSequences(
            string
          )} for string "${string}" at index ${idx}.`
        );
      }
      if (checkMinAmmountOfVowels(string) !== threeVowels) {
        throw new Error(
          `Wrong check for checkMinAmmountOfVowels! Expected: ${threeVowels}. Got: ${checkMinAmmountOfVowels(
            string
          )} for string "${string}" at index ${idx}.`
        );
      }
      if (checkDoubleLetters(string) !== doubleLetters) {
        throw new Error(
          `Wrong check for checkDoubleLetters! Expected: ${doubleLetters}. Got: ${checkDoubleLetters(
            string
          )} for string "${string}" at index ${idx}.`
        );
      }
      console.log(`Test passed for string: ${string}`);
    }
  );
  return "All Tests Succesfully passed.";
};

const mainOne = (input) => () =>
  input.reduce((acc, curr) => {
    if (!checkLegalSequences(curr)) {
      return acc;
    }
    if (!checkMinAmmountOfVowels(curr)) {
      return acc;
    }
    if (!checkDoubleLetters(curr)) {
      return acc;
    }
    acc++;
    return acc;
  }, 0);

// measureTime(testOne(testJson), "testOne");
// measureTime(mainOne(inputArray), "mainOne");

const checkPairAppearsTwice = (input) => {
  const set = new Map();
  for (let i = 0; i < input.length - 1; i++) {
    const slice = input.slice(i, i + 2);
    if (set.has(slice)) {
      const positions = set.get(slice);
      if (positions.some((pos) => Math.abs(pos - i) > 1)) {
        return true;
      }
      positions.push(i);
      set.set(slice, positions);
    } else {
      set.set(slice, [i]);
    }
  }
  return false;
};

const checkSpacedLetters = (input) => {
  for (i = 0; i < input.length - 2; i++) {
    if (input[i] === input[i + 2]) {
      return true;
    }
  }
  return false;
};
const testTwo = (testJson) => () => {
  testJson.forEach(({ string, pairTwice, spacedLetters }, idx) => {
    if (checkPairAppearsTwice(string) !== pairTwice) {
      throw new Error(
        `Wrong check for pairAppearsTwice! Expected: ${pairTwice}. Got: ${checkPairAppearsTwice(
          string
        )} for string "${string}" at index ${idx}.`
      );
    }
    console.log(`Test passed for string: ${string}`);
    if (checkSpacedLetters(string) !== spacedLetters) {
      throw new Error(
        `Wrong check for checkSpacedLetters! Expected: ${spacedLetters}. Got: ${checkSpacedLetters(
          string
        )} for string "${string}" at index ${idx}.`
      );
    }
    console.log(`Test passed for string: ${string}`);
  });
  return "All Tests Succesfully passed.";
};

const mainTwo = (input) => () =>
  input.reduce((acc, curr) => {
    if (!checkPairAppearsTwice(curr)) {
      return acc;
    }
    if (!checkSpacedLetters(curr)) {
      return acc;
    }
    acc++;
    return acc;
  }, 0);

measureTime(testTwo(testTwoJson), "testTwo");
measureTime(mainTwo(inputArray), "mainTwo");
