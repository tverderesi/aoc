const fetchInput = require("../../util/fetchInput");
const measureTime = require("../../util/measureTime");

const directionsArr = fetchInput("input.txt", "");

const dirVectors = new Map([
  ["^", { x: 0, y: 1 }],
  ["v", { x: 0, y: -1 }],
  ["<", { x: 1, y: 0 }],
  [">", { x: -1, y: 0 }],
]);

const mainOne = (directionsArr) => () => {
  const currPoint = { x: 0, y: 0 };
  const uniqueItems = new Set();
  uniqueItems.add(JSON.stringify(currPoint));
  directionsArr.forEach((item) => {
    const vector = dirVectors.get(item);
    currPoint.x += vector.x;
    currPoint.y += vector.y;
    uniqueItems.add(JSON.stringify(currPoint));
  });
  return uniqueItems.size;
};

const mainTwo = (directionsArr) => () => {
  const evenCurrPoint = { x: 0, y: 0 };
  const oddCurrPoint = { x: 0, y: 0 };
  const uniqueItems = new Set();
  uniqueItems.add(JSON.stringify(evenCurrPoint));
  uniqueItems.add(JSON.stringify(oddCurrPoint));
  directionsArr.forEach((item, idx) => {
    const vector = dirVectors.get(item);
    if (idx % 2 === 0) {
      evenCurrPoint.x += vector.x;
      evenCurrPoint.y += vector.y;
      uniqueItems.add(JSON.stringify(evenCurrPoint));
    } else {
      oddCurrPoint.x += vector.x;
      oddCurrPoint.y += vector.y;
      uniqueItems.add(JSON.stringify(oddCurrPoint));
    }
  });
  return uniqueItems.size;
};

measureTime(mainOne(directionsArr), "partOne");
measureTime(mainTwo(directionsArr), "partTwo");
