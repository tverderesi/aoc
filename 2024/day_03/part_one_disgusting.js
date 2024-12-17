console.log(
  Array.from(
    require("node:fs")
      .readFileSync("input.txt")
      .toString()
      .matchAll(/mul\((\d+),(\d+)\)/g)
  )
    .map((match) => [match[1], match[2]])
    .reduce((acc, curr) => (acc += curr[0] * curr[1]), 0)
);
