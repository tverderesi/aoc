const fetchInput = require("../../util/fetchInput");
const measureTime = require("../../util/measureTime");
const accCoordinate = { x: 0, y: 0, direction: "N" };

const rotateRight = new Map([
  ["N", "E"],
  ["E", "S"],
  ["S", "W"],
  ["W", "N"],
]);

const rotateLeft = new Map([
  ["N", "W"],
  ["W", "S"],
  ["S", "E"],
  ["E", "N"],
]);

const direction = new Map([
  ["N", { x: 0, y: 1 }],
  ["E", { x: 1, y: 0 }],
  ["S", { x: 0, y: -1 }],
  ["W", { x: -1, y: 0 }],
]);

const move = ({ currInstruction, accCoordinate }) => {
  const [rotation, distance] = [
    currInstruction.slice(0, 1),
    currInstruction.slice(1),
  ];
  if (rotation !== "R" && rotation !== "L") {
    throw new Error(`Invalid Rotation: ${rotation}.`);
  }

  accCoordinate.direction =
    rotation == "R"
      ? rotateRight.get(accCoordinate.direction)
      : rotateLeft.get(accCoordinate.direction);
  accCoordinate.x += direction.get(accCoordinate.direction).x * distance;
  accCoordinate.y += direction.get(accCoordinate.direction).y * distance;
  return accCoordinate;
};

const inputArray = fetchInput("input.txt", ", ");

console.log();

measureTime(
  () =>
    inputArray.forEach((curr) => {
      const { x, y } = move({ currInstruction: curr, accCoordinate });
      console.log(Math.abs(x) + Math.abs(y));
    }),
  "pt01"
);
