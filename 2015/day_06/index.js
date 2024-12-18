const fetchInput = require("../../util/fetchInput");
const measureTime = require("../../util/measureTime");

const input = fetchInput("input.txt", "\n");

const grid = Array.from({ length: 1000 }, () => Array(1000).fill(0));

const getInstruction = (instruction) => {
  const regex =
    /(turn on|turn off|toggle) (\d{1,3},\d{1,3}) through (\d{1,3},\d{1,3})/;
  const match = instruction.match(regex);
  if (match) {
    const [_, inst, coord1, coord2] = match;
    return {
      instruction: inst,
      coord1: coord1.split(",").map(Number),
      coord2: coord2.split(",").map(Number),
    };
  }
  return null;
};

const executeInstruction = ({ instruction, gridItem, phaseTwo = false }) => {
  if (phaseTwo) {
    switch (instruction) {
      case "turn on":
        return gridItem + 1;
      case "turn off":
        return Math.max(0, gridItem - 1);
      case "toggle":
        return gridItem + 2;
      default:
        return gridItem;
    }
  } else {
    switch (instruction) {
      case "turn on":
        return 1;
      case "turn off":
        return 0;
      case "toggle":
        return gridItem === 1 ? 0 : 1;
      default:
        return gridItem;
    }
  }
};

const main = (instructions, grid, phaseTwo = false) => {
  const parsedInstructions = instructions.map(getInstruction).filter(Boolean);

  for (const { instruction, coord1, coord2 } of parsedInstructions) {
    for (let i = coord1[0]; i <= coord2[0]; i++) {
      for (let j = coord1[1]; j <= coord2[1]; j++) {
        grid[i][j] = executeInstruction({
          instruction,
          gridItem: grid[i][j],
          phaseTwo,
        });
      }
    }
  }

  return grid.reduce(
    (acc, row) => acc + row.reduce((acc, curr) => acc + curr, 0),
    0
  );
};

// measureTime(() => main(input, grid), "mainOne");
measureTime(() => main(input, grid, true), "mainTwo");
