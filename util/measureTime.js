const { time, timeEnd, log } = require("console");
const measureTime = (fn, tag) => {
  time(tag);
  log(fn());
  timeEnd(tag);
};

module.exports = measureTime;
