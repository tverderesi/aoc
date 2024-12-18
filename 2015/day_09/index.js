const { log } = require("console");
const fetchInput = require("../../util/fetchInput");
const measureTime = require("../../util/measureTime");

const input = fetchInput("input.txt", "\n");

const distanceLines = (line) => {
  const regex = /(.+?) to (.+?) = (\d+)/;
  const match = line.match(regex);
  if (match) {
    const [_, cityOne, cityTwo, number] = match;
    return {
      cityOne,
      cityTwo,
      distance: Number(number),
    };
  }
  return null;
};

const uniqueCitiesArray = (input) => {
  const uniqueCitySet = new Set();
  input.map((line) => {
    const { cityOne, cityTwo } = distanceLines(line);
    uniqueCitySet.add(cityOne, cityTwo);
  });
  return Array.from(uniqueCitySet);
};

const main = (input) => {
  const uniqueCities = uniqueCitiesArray(input).sort();
  console.log(uniqueCities);
};

measureTime(() => main(input), "partOne");
