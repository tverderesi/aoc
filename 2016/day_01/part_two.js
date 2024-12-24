const fetchInput = require("../../util/fetchInput");
const measureTime = require("../../util/measureTime");
let accCoordinate = { x: 0, y: 0, direction: "N" };

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

const coordinatesSet = new Set();

const move = ({ currInstruction, accCoordinate, partTwo = false }) => {
  const [rotation, distance] = [
    currInstruction.slice(0, 1),
    parseInt(currInstruction.slice(1), 10),
  ];
  if (rotation !== "R" && rotation !== "L") {
    throw new Error(`Invalid Rotation: ${rotation}.`);
  }

  accCoordinate.direction =
    rotation === "R"
      ? rotateRight.get(accCoordinate.direction)
      : rotateLeft.get(accCoordinate.direction);

  for (let i = 0; i < distance; i++) {
    accCoordinate.x += direction.get(accCoordinate.direction).x;
    accCoordinate.y += direction.get(accCoordinate.direction).y;
    const coordinateString = JSON.stringify({
      x: accCoordinate.x,
      y: accCoordinate.y,
    });
    if (coordinatesSet.has(coordinateString) && partTwo) {
      console.log(`First repeated coordinate: ${coordinateString}`);
      throw new Error(Math.abs(accCoordinate.x) + Math.abs(accCoordinate.y)); // Stop iteration and return distance
    }
    coordinatesSet.add(coordinateString); // Add new coordinate to the set
  }

  return accCoordinate;
};

const inputArray = fetchInput("input.txt", ", ");

measureTime(() => {
  try {
    inputArray.forEach((curr) => {
      accCoordinate = move({ currInstruction: curr, accCoordinate });
    });
  } catch (e) {
    console.log(`Distance to first repeated location: ${e.message}`);
  }
}, "pt02");
