const fetchInput = require("../util/fetchInput");
const splitIntoGrid = require("../util/splitIntoGrid");

const testInput = fetchInput("test.txt");
const inputInput = fetchInput("input.txt");

const findStartingPoints = (testGrid) => {
  const startingPoints = [];
  for (let row = 0; row < testGrid.length; row++) {
    for (let col = 0; col < testGrid[row].length; col++) {
      if (testGrid[row][col] == 0) {
        startingPoints.push({ row: row, col: col });
      }
    }
  }
  return startingPoints;
};

const findNextPointArray = (lastPointArray, value, grid) => {
  const nextPointArray = [];
  for (const point of lastPointArray) {
    const left = { row: point["row"] - 1, col: point["col"] };
    const right = { row: point["row"] + 1, col: point["col"] };
    const up = { row: point["row"], col: point["col"] - 1 };
    const down = { row: point["row"], col: point["col"] + 1 };

    if (
      isValidSearchPoint(left, grid) &&
      grid[left["row"]][left["col"]] == value
    ) {
      nextPointArray.push({ row: left["row"], col: left["col"] });
    }
    if (
      isValidSearchPoint(right, grid) &&
      grid[right["row"]][right["col"]] == value
    ) {
      nextPointArray.push({ row: right["row"], col: right["col"] });
    }
    if (isValidSearchPoint(up, grid) && grid[up["row"]][up["col"]] == value) {
      nextPointArray.push({ row: up["row"], col: up["col"] });
    }
    if (
      isValidSearchPoint(down, grid) &&
      grid[down["row"]][down["col"]] == value
    ) {
      nextPointArray.push({ row: down["row"], col: down["col"] });
    }
  }
  return nextPointArray;
};

const isValidSearchPoint = ({ row, col }, grid) => {
  return row > 0 && col > 0 && row < grid.length && col < grid[row].length;
};

const main = (input) => {
  const grid = splitIntoGrid(input);
  const steps = Array.from({ length: 9 }, (_, i) => i + 1);
  let lastPointArray = findStartingPoints(grid);

  for (const step of steps) {
    lastPointArray = findNextPointArray(lastPointArray, step, grid);
  }
  return lastPointArray;
};

console.log(main(testInput).length + 1);
console.log(main(inputInput).length + 1);
