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

const validateAndFixPages = ({ rules, pages }) => {
  console.log(pages);
  const pageAsArray = pages.split(",");
  let correctedPages = pageAsArray;
  for (const rule of rules) {
    const [before, after] = splitRules(rule);
    const indexOfBefore = pageAsArray.indexOf(before);
    const indexOfAfter = pageAsArray.indexOf(after);
    const valid = indexOfBefore < indexOfAfter;
    if (!valid) {
      correctedPages[indexOfAfter] = before;
      correctedPages[indexOfBefore] = after;
      validateAndFixPages({
        rules,
        pages: correctedPages.join(","),
      });
    }
  }
  return { correctedPages };
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
    const { correctedPages } = validateAndFixPages({
      rules: filteredRules,
      pages: page,
    });
    const pageAsArray = correctedPages;
    const middleIndex = Math.floor((pageAsArray.length - 1) / 2);
    cumSum += Number(pageAsArray[middleIndex]);
  }
  return cumSum;
};

// console.log(main_two(test) - main(test));
console.log(main_two(input) - main(input));
// console.log(validateAndFixPages({ rules: filteredRules, pages: pages[3] }));
