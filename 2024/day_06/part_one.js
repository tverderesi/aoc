const fs = require("node:fs");
const test = fs.readFileSync("test.txt").toString().split("\n");
const input = fs.readFileSync("input.txt").toString().split("\n");

const findStartingDirection = (input) => {
  const vectors = { "<": [0, -1], v: [1, 0], ">": [0, 1], "^": [-1, 0] };
  const icon = input.join("").match(/<|v|>|\^/g)[0];
  return vectors[icon];
};

const findStartingPosition = (input) => {
  let positionVector;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j].match(/<|v|>|\^/g)) {
        positionVector = [i, j];
      }
    }
  }
  return positionVector;
};

const rotateVector = (vector) => {
  const vectors = { "<": [-1, 0], "^": [0, 1], ">": [1, 0], v: [0, -1] };
  return vectors[vector];
};

const rotateGuardSprite = (guard) => {
  const spriteHash = { "^": ">", ">": "v", v: "<", "<": "^" };
  return spriteHash[guard];
};

const evaluateNextAction = (position, direction, input) => {
  const [x, y] = position;
  const guard = input[x][y];
  const newX = x + direction[0];
  const newY = y + direction[1];
  let map = input.map((row) => [...row]);

  const nextBlock = input[newX][newY];
  let newDirection, newPosition;

  if (nextBlock === "#") {
    newDirection = rotateVector(guard);
    map[x][y] = rotateGuardSprite(guard);
    newPosition = [x, y];
  }
  if (nextBlock === ".") {
    newDirection = direction;
    newPosition = [newX, newY];
    map[newX][newY] = guard;
    map[x][y] = "X";
  }
  if (nextBlock === "X") {
    newDirection = direction;
    newPosition = [newX, newY];
    map[newX][newY] = guard;
    map[x][y] = "X";
  }
  joinedMap = map.map((row) => row.join(""));
  return { position: newPosition, direction: newDirection, map: joinedMap };
};

const timeStep = (startingPosition, startingDirection, input) => {
  let map = input;
  let position = startingPosition;
  let direction = startingDirection;
  let newGameState;
  try {
    while (true) {
      newGameState = evaluateNextAction(position, direction, map);
      position = newGameState.position;
      direction = newGameState.direction;
      map = newGameState.map;
    }
  } catch {
    console.log(map.join("").matchAll(/X/g).toArray().length + 1);
  }
};

timeStep(findStartingPosition(test), findStartingDirection(test), test);
timeStep(findStartingPosition(input), findStartingDirection(input), input);
