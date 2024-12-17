const fs = require("node:fs");
const test = fs.readFileSync("test.txt").toString().split("\n");
const input = fs.readFileSync("input.txt").toString().split("\n");

const sanitizeInput = (input) => {
  const pivot = input.indexOf("");
  return { rules: input.slice(0, pivot), pages: input.slice(pivot + 1) };
};

const splitRules = (rules) => rules.split("|");

const filterApplyableRules = ({ rules, pages }) => {
  const applyableRules = rules.filter((rule) => {
    const [before, after] = splitRules(rule);
    return pages.indexOf(before) > -1 && pages.indexOf(after) > -1;
  });
  return applyableRules;
};

const validatePages = ({ rules, pages }) => {
  for (const rule of rules) {
    const [before, after] = splitRules(rule);
    const valid = pages.indexOf(before) < pages.indexOf(after);
    if (!valid) {
      return false;
    }
  }
  return true;
};

const fixPageOrder = ({ rules, pages }) => {
  const pageAsArray = pages.split(",");
  pageAsArray.sort((a, b) => {
    for (const rule of rules) {
      const [before, after] = splitRules(rule);
      if (before === a && after === b) return -1;
      if (before === b && after === a) return 1;
    }
    return 0;
  });

  return pageAsArray;
};

const main = (input) => {
  const { pages, rules } = sanitizeInput(input);
  let cumSum = 0;
  for (const page of pages) {
    const filteredRules = filterApplyableRules({ rules, pages: page });
    if (validatePages({ rules: filteredRules, pages: page })) {
      const pageAsArray = page.split(",");
      const middleIndex = Math.floor((pageAsArray.length - 1) / 2);
      cumSum += Number(pageAsArray[middleIndex]);
    }
  }
  return cumSum;
};

const main_two = (input) => {
  const { pages, rules } = sanitizeInput(input);
  let cumSum = 0;
  for (const page of pages) {
    const filteredRules = filterApplyableRules({ rules, pages: page });
    if (!validatePages({ rules: filteredRules, pages: page })) {
      const fixedPage = fixPageOrder({
        rules: filteredRules,
        pages: page,
      });
      const middleIndex = Math.floor((fixedPage.length - 1) / 2);
      cumSum += Number(fixedPage[middleIndex]);
    }
  }
  return cumSum;
};

console.log(`Part One -> test: ${main(test)}`);
console.log(`Part One -> input: ${main(input)}`);
console.log(`Part Two -> test: ${main_two(test)}`);
console.log(`Part Two -> input: ${main_two(input)}`);
