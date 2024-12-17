const fetchInput = require("../util/fetchInput");

const test = fetchInput("test.txt", "");
const input = fetchInput("input.txt", "");

const buildUncompressedFile = (input) => {
  let id = 0;
  const uncompressedFile = [];
  for (let i = 0; i < input.length; i++) {
    const array = Array(Number(input[i]));
    if (i % 2 === 0) {
      array.fill(id);
      uncompressedFile.push(...array);
      id++;
    } else {
      array.fill(".");
      uncompressedFile.push(...array);
    }
  }
  return uncompressedFile;
};

/**
 * @param {Array} uncompressedFile
 */
const compactFile = (uncompressedFile) => {
  for (i = uncompressedFile.length - 1; i >= 0; i--) {
    if (uncompressedFile[i] !== ".") {
      const idx = uncompressedFile.indexOf(".");
      if (idx !== undefined && idx < i) {
        uncompressedFile[idx] = uncompressedFile[i];
        uncompressedFile[i] = ".";
      }
    }
  }
  return uncompressedFile;
};

/**
 * @param {Array} compressedFile
 * @returns
 */
const calculateHash = (compressedFile) => {
  const filledArray = compressedFile.slice(0, compressedFile.indexOf("."));
  return filledArray.reduce((acc, curr, idx) => (acc += curr * idx), 0);
};

const main = (input) => {
  const uncompressedFile = buildUncompressedFile(input);
  const compressedFile = compactFile(uncompressedFile);
  return calculateHash(compressedFile);
};

console.log(main(test));
console.log(main(input));
