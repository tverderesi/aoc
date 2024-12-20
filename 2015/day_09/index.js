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
  const distanceArray = input.map((line) => distanceLines(line));
  const queue = uniqueCitiesArray(input).sort();
  const weightsMatrix = {};
  queue.forEach(
    (item) => (weightsMatrix[item] = { visited: false, weight: Infinity })
  );

  //first iteration will start by choosing the smallest distance
  const firstCity = distanceArray.sort((a, b) => a.distance - b.distance)[0]
    .cityOne;

  //setting weight to firstCity to Zero.
  weightsMatrix[firstCity]["weight"] = 0;

  //set visited true as it does not need relaxation
  weightsMatrix[firstCity]["visited"] = true;

  //remove city from queue
  queue.splice(
    queue.findIndex((item) => item === firstCity),
    1
  );

  //
  //relaxtion step
  const lol = queue.map((_, queueIdx) => {
    return distanceArray.find(
      (item) =>
        (item.cityOne === firstCity && item.cityTwo === queue[queueIdx]) ||
        (item.cityTwo === firstCity && item.cityOne === queue[queueIdx])
    );
  });
  lol.map((item, _, arr) => {
    const cityToSet = item.cityOne !== firstCity ? item.cityOne : item.cityTwo;
    const weightToSet = arr.filter((item) => {
      return item.cityOne === cityToSet || item.cityTwo === cityToSet;
    })[0]["distance"];

    weightsMatrix[cityToSet]["weight"] = weightToSet;
  });
  return weightsMatrix;
};

measureTime(() => main(input), "partOne");
