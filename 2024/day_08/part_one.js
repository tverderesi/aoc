const splitIntoGrid = require("../util/splitIntoGrid");
const fs = require("fs");

const testGrid = splitIntoGrid(
  fs.readFileSync("test.txt").toString(),
  "\n",
  ""
);
const inputGrid = splitIntoGrid(
  fs.readFileSync("input.txt").toString(),
  "\n",
  ""
);

const getGridDimenstions = (input) => {
  if (!input.map((row) => row.length).every((row) => row === input[0].length)) {
    throw new Error("this is not a grid");
  }
  return { x: input.length, y: input[0].length };
};

const getXYDelta = ([initial, final]) => ({
  x: final.x - initial.x,
  y: final.y - initial.y,
});

const findAntinodePair = ([initial, final], XYDelta) => {
  const antinodeZero = { x: initial.x - XYDelta.x, y: initial.y - XYDelta.y };
  const antinodeOne = { x: final.x + XYDelta.x, y: final.y + XYDelta.y };
  return [antinodeZero, antinodeOne];
};

const validateAntinodes = (antinodeInputArray, gridDimensions) => {
  const validAntinodes = antinodeInputArray.filter(({ x, y }) => {
    return x >= 0 && x < gridDimensions.x && y >= 0 && y < gridDimensions.y;
  });

  return validAntinodes;
};

/**
 * Finds unique antinodes in the given input based on antenna groups.
 *
 * @param {string} input - The input data representing the grid.
 * @param {Map} antennaGroups - A map containing antenna groups.
 * @returns {Set} An array of unique antinodes.
 */
const findUniqueAntinodes = (input, antennaGroups) => {
  const gridDimensions = getGridDimenstions(input);
  const uniqueAntinodes = [];

  const antennaKeys = antennaGroups.keys().toArray();
  for (const antennaKey of antennaKeys) {
    const antennasCoordinates = antennaGroups.get(antennaKey);
    for (let i = 0; i < antennasCoordinates.length; i++) {
      for (let j = i + 1; j < antennasCoordinates.length; j++) {
        const antennaAntinodePair = findAntinodePair(
          [antennasCoordinates[i], antennasCoordinates[j]],
          getXYDelta([antennasCoordinates[i], antennasCoordinates[j]])
        );

        const validAntinodes = validateAntinodes(
          antennaAntinodePair,
          gridDimensions
        );

        uniqueAntinodes.push(...validAntinodes);
      }
    }
  }
  const uniqueAntinodesSet = new Set(uniqueAntinodes.map(JSON.stringify));
  return uniqueAntinodesSet;
};

const findAntennaGroups = (input) => {
  const antennaGroups = new Map();
  antennaGroups.values;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] !== ".") {
        if (!antennaGroups.get(input[i][j])) {
          antennaGroups.set(input[i][j], [{ x: i, y: j }]);
        } else {
          const currentAntennaPositionArray = antennaGroups.get(input[i][j]);
          currentAntennaPositionArray.push({ x: i, y: j });
          antennaGroups.set(input[i][j], currentAntennaPositionArray);
        }
      }
    }
  }
  return antennaGroups;
};

console.log(findUniqueAntinodes(testGrid, findAntennaGroups(testGrid)).size);
console.log(findUniqueAntinodes(inputGrid, findAntennaGroups(inputGrid)).size);
