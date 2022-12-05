const fs = require('fs');

// helper function to get the sum of an array of numbers.
const sumCalories = (calories) => {
  let total = 0;
  for (let cal of calories) {
    total += +cal;
  }
  return total;
};

// format puzzle input as an array in order to be manipulated easy
const format_elves_calories = (input) => {
  return input
    .toString()
    .split('\n\n')
    .map((elf) => elf.split('\n'));
};

// get the total calories for every group calories
const getCaloriesTotals = (calories) => {
  return format_elves_calories(calories).map((elfCalories) =>
    sumCalories(elfCalories)
  );
};

// get the maximum of the totals
const getMaxCalories = (calories) => {
  return Math.max(...getCaloriesTotals(calories));
};

// Optional function to get the total number of elves.
const findNumberOfElves = (calories) => {
  return console.log(
    `There are ${
      calories ? (calories.match(/^[ \t]*$/gm) || []).length + 1 : 0
    } elves`
  );
};

// Optional function to get which elf has the max calories.
const findElfWithMaxCalories = (calories) => {
  const totals = getCaloriesTotals(calories);
  return console.log(
    `Elf with max calories No: ${totals.indexOf(getMaxCalories(calories)) + 1}`
  );
};

// Part 1 question
const findMaxCalories = (calories) => {
  return console.log(`Max calories:  ${getMaxCalories(calories)}`);
};

// Part 2 question
const findTotalOfThreeMaxCalories = (calories) => {
  const threeMaxTotalCalories = sumCalories(
    getCaloriesTotals(calories)
      .sort((a, b) => b - a)
      .slice(0, 3)
  );
  console.log(`Max three calories total: ${threeMaxTotalCalories}`);
};

const puzzle_Day_1 = () => {
  fs.readFile('./input.txt', (err, data) => {
    const foodCalories = data.toString();
    findNumberOfElves(foodCalories);
    findElfWithMaxCalories(foodCalories);
    findMaxCalories(foodCalories);
    findTotalOfThreeMaxCalories(foodCalories);
  });
};

puzzle_Day_1();
