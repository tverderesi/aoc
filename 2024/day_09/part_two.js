const fetchInput = require("../util/fetchInput");

const test = fetchInput("test.txt", "");
const input = fetchInput("input.txt", "");
const buildUncompressedFile = (input) => {
  let id = 0;
  let endIdx = 0;
  const uncompressedFile = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== "0") {
      if (i % 2 === 0) {
        const currentFileBlock = {
          size: Number(input[i]),
          type: "file",
          startIdx: endIdx,
          endIdx: endIdx + Number(input[i]),
          id: id,
        };
        uncompressedFile.push(currentFileBlock);
        id++;
        endIdx = currentFileBlock.endIdx;
      } else {
        const currentFileBlock = {
          size: Number(input[i]),
          type: "empty",
          startIdx: endIdx,
          endIdx: endIdx + Number(input[i]),
        };
        uncompressedFile.push(currentFileBlock);
        endIdx = currentFileBlock.endIdx;
      }
    }
  }
  return uncompressedFile;
};

/**
 * @param {Array} uncompressedFile
 */
const compactFile = (uncompressedFile) => {
  const emptyBlocks = uncompressedFile
    .filter(({ type }) => type === "empty")
    .sort((a, b) => a.startIdx - b.startIdx);
  const fileBlocks = uncompressedFile
    .filter(({ type }) => type === "file")
    .sort((a, b) => b.id - a.id);
  for (let i = 0; i < fileBlocks.length; i++) {
    const uncompressedBlockSize = fileBlocks[i].size;
    const firstEmptyIndex = emptyBlocks.findIndex(
      (item) =>
        item.startIdx < fileBlocks[i].startIdx &&
        item.size - uncompressedBlockSize > -1
    );
    if (firstEmptyIndex >= 0) {
      fileBlocks[i] = {
        ...fileBlocks[i],
        startIdx: emptyBlocks[firstEmptyIndex].startIdx,
        endIdx: emptyBlocks[firstEmptyIndex].startIdx + fileBlocks[i].size,
      };
      emptyBlocks[firstEmptyIndex] = {
        ...emptyBlocks[firstEmptyIndex],
        startIdx: emptyBlocks[firstEmptyIndex].startIdx + fileBlocks[i].size,
        size: emptyBlocks[firstEmptyIndex].size - fileBlocks[i].size,
      };
      if (emptyBlocks[firstEmptyIndex].size === 0) {
        emptyBlocks.splice(firstEmptyIndex, 1);
      }
    }
  }
  return fileBlocks;
};

/**
 * @param {Array} compressedFile
 * @returns
 */
const calculateHash = (compressedFile) => {
  return compressedFile.reduce((acc, curr, idx) => {
    if (curr !== ".") {
      acc += BigInt(curr) * BigInt(idx);
    }
    return acc;
  }, BigInt(0));
};

const buildArray = (size, compressedFile) => {
  const arr = Array(size).fill(".");
  compressedFile.forEach(({ startIdx, endIdx, id }) =>
    arr.fill(id, startIdx, endIdx)
  );
  return arr;
};

const main = (input) => {
  const uncompressedFile = buildUncompressedFile(input);
  const compressedFile = compactFile(uncompressedFile);
  const builtArr = buildArray(
    uncompressedFile[uncompressedFile.length - 1].endIdx,
    compressedFile
  );
  return calculateHash(builtArr);
};

console.time("lol");
console.log(main(test));
console.log(main(input));
console.timeEnd("lol");
