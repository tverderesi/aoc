const splitIntoGrid = (input, splitRow = "\n", splitCol = " ") => {
  const grid = [];
  const rows = input.split(splitRow);
  for (let row of rows) {
    columns = row.split(splitCol);
    grid.push(columns);
  }
  return grid;
};
module.exports = splitIntoGrid;
