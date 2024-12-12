const fs = require("fs");

const fetchInput = (input_path, split = undefined) => {
  const input = fs.readFileSync(input_path).toString();
  if (split) {
    return input.split(split);
  }
  return input;
};

module.exports = fetchInput;
