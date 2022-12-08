const fs = require('fs');

// format puzzle input as an array in order to be manipulated easy
const formatRucksacks = (rucksacks) => {
  return rucksacks
    .toString()
    .split('\n')
    .map((rucksack) => rucksack.split(' '));
};

// format puzzle input as a grouped array in order to be manipulated easy
const formatGroupedRucksacks = (rucksacks) => {
  return rucksacks
    .match(/(?:.+\n?){3}/gm)
    .map((rucksack) => rucksack.split('\n'));
};

// helper function sum elements in an array
const sumArray = (rounds) => {
  return rounds.reduce((previous, current) => previous + current, 0);
};

// give priority weights to an item
const prioritizeItem = (item) => {
  let priority = 0;

  if (/[A-Z]/.test(item)) {
    priority = item[0].charCodeAt(0) - 38;
  } else {
    priority = item[0].charCodeAt(0) - 96;
  }
  return priority;
};

// find duplicate item and return its priority weight
const findDuplicateItem = (str1, str2) => {
  let duplicateItem = '';
  const obj = str2.split('');
  for (let str of str1) {
    let idx = obj.findIndex((s) => s === str);
    if (idx >= 0) {
      duplicateItem = obj.splice(idx, 1);
    }
  }
  return prioritizeItem(duplicateItem.toString());
};

// find the duplicate item from group and return its priority weight
const findDuplicateFromGroupedItems = (str1, str2, str3) => {
  const firstRucksack = str1.split('');
  const secondRucksack = str2.split('');
  const thirdRucksack = str3.split('');

  let duplicateCharacter = null;
  for (let i = 0; i < firstRucksack.length; i++) {
    if (
      secondRucksack.includes(firstRucksack[i]) &&
      thirdRucksack.includes(firstRucksack[i])
    ) {
      duplicateCharacter = prioritizeItem(firstRucksack[i]);
    }
  }

  return duplicateCharacter;
};

// Split rucksacks to compartments and return all duplicate items with priority weights
const findAllDuplicateOfRucksacks = (rucksacks) => {
  return rucksacks.map((rucksack) => {
    const middle = rucksack.toString().length / 2;
    const firstCompartment = rucksack.toString().substr(0, middle);
    const secondCompartment = rucksack.toString().substr(middle);
    const duplicateItems = findDuplicateItem(
      firstCompartment,
      secondCompartment
    );
    return duplicateItems;
  });
};

// Return grouped rucksacks to compartments and return all duplicate items with priority weights
const findAllDuplicateOfGroupedRucksacks = (rucksacks) => {
  return rucksacks.map((rucksack) => {
    const duplicateItems = findDuplicateFromGroupedItems(
      rucksack[0],
      rucksack[1],
      rucksack[2]
    );
    return duplicateItems;
  });
};

const puzzle_Day_3 = () => {
  fs.readFile('./input.txt', (err, data) => {
    const rucksacks = data.toString();
    console.log(
      'Duplicate items priorities sum:  ',
      sumArray(findAllDuplicateOfRucksacks(formatRucksacks(rucksacks)))
    );
    console.log(
      'Duplicate grouped items priorities sum:  ',
      sumArray(
        findAllDuplicateOfGroupedRucksacks(formatGroupedRucksacks(rucksacks))
      )
    );
  });
};

puzzle_Day_3();
