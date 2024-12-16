const splitIntoGrid = require("../util/splitIntoGrid");
const fs = require("fs");

const test = fs.readFileSync("test.txt").toString();
const testGrid = splitIntoGrid("test.txt");
const findAntennaGroups = (input) => {
  const antennaGroups = new Map();

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        if (!antennaGroups.get(input[i][j])) {
          
      }
    }
  }
};

console.log(findAntennaGroups(test));
