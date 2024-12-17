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

const findAllHarmonicAntinodes = (
  [initial, final],
  XYDelta,
  gridDimensions
) => {
  const harmonicAntinodes = [];
  let forwardsX = final.x + XYDelta.x;
  let forwardsY = final.y + XYDelta.y;
  let backwardsX = initial.x - XYDelta.x;
  let backwardsY = initial.y - XYDelta.y;

  //finding backwards nodes, i was too lazy to put this into a new function
  while (
    backwardsX >= 0 &&
    backwardsY >= 0 &&
    backwardsX < gridDimensions.x &&
    backwardsY < gridDimensions.y
  ) {
    harmonicAntinodes.push({ x: backwardsX, y: backwardsY });
    backwardsX -= XYDelta.x;
    backwardsY -= XYDelta.y;
  }

  while (
    forwardsX < gridDimensions.x &&
    forwardsY < gridDimensions.y &&
    forwardsX >= 0 &&
    forwardsY >= 0
  ) {
    harmonicAntinodes.push({ x: forwardsX, y: forwardsY });
    forwardsX += XYDelta.x;
    forwardsY += XYDelta.y;
  }

  harmonicAntinodes.push(initial, final);

  return harmonicAntinodes;
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
        const antennaAntinodeHarmonics = findAllHarmonicAntinodes(
          [antennasCoordinates[i], antennasCoordinates[j]],
          getXYDelta([antennasCoordinates[i], antennasCoordinates[j]]),
          gridDimensions
        );

        uniqueAntinodes.push(...antennaAntinodeHarmonics);
      }
    }
  }
  const uniqueAntinodesSet = new Set(uniqueAntinodes.map(JSON.stringify));
  return uniqueAntinodesSet;
};

console.log(findUniqueAntinodes(testGrid, findAntennaGroups(testGrid)).size);

console.log(findUniqueAntinodes(inputGrid, findAntennaGroups(inputGrid)).size);
