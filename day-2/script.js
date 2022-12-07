const fs = require('fs');

// format puzzle input as an array in order to be manipulated easy
// [
//    [ 'A', 'Z' ], [ 'A', 'Y' ], [ 'B', 'X' ], [ 'B', 'X' ], [ 'C', 'X' ],...
// ]
const formatRounds = (rounds) => {
  return rounds
    .toString()
    .split('\n')
    .map((round) => round.split(' '));
};

// helper function sum elements in an array
const sumArray = (rounds) => {
  return rounds.reduce((previous, current) => previous + current, 0);
};

// format rounds to each weights replace the array[0] to round result
// [
//  [ 0, 3 ], [ 6, 2 ], [ 0, 1 ], [ 0, 1 ], [ 6, 1 ],...
// ]
//------------------1st puzzle RULES -------------------------------------- //
// Win = 6
// Draw = 3
// Lose = 0
// X = Rock =  1
// Y = Paper = 2
// Z = Scissors = 3
// ['A','X'] = 3 Draw | ['B','X'] = 0 Lose | ['C','X'] = 6 Win
// ['A','Y'] = 6 Win  | ['B','Y'] = 3 Draw | ['C','Y'] = 0 Lose
// ['A','Z'] = 0 Lose | ['B','Z'] = 6 Win  | ['C','Z'] = 3 Draw
const firstPuzzleFormatRoundsToWeights = (rounds) => {
  const weightRounds = formatRounds(rounds);
  for (let round of weightRounds) {
    if (round.indexOf('A') !== -1 && round.indexOf('X') !== -1)
      round.splice(round.indexOf('A'), 1, 3);
    if (round.indexOf('A') !== -1 && round.indexOf('Y') !== -1)
      round.splice(round.indexOf('A'), 1, 6);
    if (round.indexOf('A') !== -1 && round.indexOf('Z') !== -1)
      round.splice(round.indexOf('A'), 1, 0);
    if (round.indexOf('B') !== -1 && round.indexOf('X') !== -1)
      round.splice(round.indexOf('B'), 1, 0);
    if (round.indexOf('B') !== -1 && round.indexOf('Y') !== -1)
      round.splice(round.indexOf('B'), 1, 3);
    if (round.indexOf('B') !== -1 && round.indexOf('Z') !== -1)
      round.splice(round.indexOf('B'), 1, 6);
    if (round.indexOf('C') !== -1 && round.indexOf('X') !== -1)
      round.splice(round.indexOf('C'), 1, 6);
    if (round.indexOf('C') !== -1 && round.indexOf('Y') !== -1)
      round.splice(round.indexOf('C'), 1, 0);
    if (round.indexOf('C') !== -1 && round.indexOf('Z') !== -1)
      round.splice(round.indexOf('C'), 1, 3);
    if (round.indexOf('X') !== -1) round.splice(round.indexOf('X'), 1, 1);
    if (round.indexOf('Y') !== -1) round.splice(round.indexOf('Y'), 1, 2);
    if (round.indexOf('Z') !== -1) round.splice(round.indexOf('Z'), 1, 3);
  }
  return weightRounds;
};

// format rounds to each weights replace the array[0] to the weight of my choice
// [
//  [ 2, 6 ], [ 1, 3 ], [ 1, 0 ], [ 1, 0 ], [ 2, 0 ],...
// ]
//------------------2st puzzle RULES -------------------------------------- //
// X = lose =  0
// Y = Draw = 3
// Z = Win = 6
// A = Rock =  1
// B = Paper = 2
// Z = Scissors = 3
// ['A','X'] = 3 Scissors | ['B','X'] = 1 Rock      | ['C','X'] = 2 Paper
// ['A','Y'] = 1 Rock     | ['B','Y'] = 2 Paper     | ['C','Y'] = 3 Scissors
// ['A','Z'] = 2 Paper    | ['B','Z'] = 3 Scissors  | ['C','Z'] = 1 Rock
const secondPuzzleFormatRoundsToWeights = (rounds) => {
  const weightRounds = formatRounds(rounds);
  for (let round of weightRounds) {
    if (round.indexOf('A') !== -1 && round.indexOf('X') !== -1)
      round.splice(round.indexOf('A'), 1, 3);
    if (round.indexOf('A') !== -1 && round.indexOf('Y') !== -1)
      round.splice(round.indexOf('A'), 1, 1);
    if (round.indexOf('A') !== -1 && round.indexOf('Z') !== -1)
      round.splice(round.indexOf('A'), 1, 2);
    if (round.indexOf('B') !== -1 && round.indexOf('X') !== -1)
      round.splice(round.indexOf('B'), 1, 1);
    if (round.indexOf('B') !== -1 && round.indexOf('Y') !== -1)
      round.splice(round.indexOf('B'), 1, 2);
    if (round.indexOf('B') !== -1 && round.indexOf('Z') !== -1)
      round.splice(round.indexOf('B'), 1, 3);
    if (round.indexOf('C') !== -1 && round.indexOf('X') !== -1)
      round.splice(round.indexOf('C'), 1, 2);
    if (round.indexOf('C') !== -1 && round.indexOf('Y') !== -1)
      round.splice(round.indexOf('C'), 1, 3);
    if (round.indexOf('C') !== -1 && round.indexOf('Z') !== -1)
      round.splice(round.indexOf('C'), 1, 1);
    if (round.indexOf('X') !== -1) round.splice(round.indexOf('X'), 1, 0);
    if (round.indexOf('Y') !== -1) round.splice(round.indexOf('Y'), 1, 3);
    if (round.indexOf('Z') !== -1) round.splice(round.indexOf('Z'), 1, 6);
  }
  return weightRounds;
};

// get total for each round
// [
//   3, 8, 1, 1, 7,....
// ]
const getRoundTotal_1stPuzzle = (rounds) => {
  return firstPuzzleFormatRoundsToWeights(rounds).map((round) =>
    sumArray(round)
  );
};

// get total for each round
// [
//   8, 4, 1, 1, 2,....
// ]
const getRoundTotal_2ndPuzzle = (rounds) => {
  return secondPuzzleFormatRoundsToWeights(rounds).map((round) =>
    sumArray(round)
  );
};

const puzzle_Day_2 = () => {
  fs.readFile('./input.txt', (err, data) => {
    const rounds = data.toString();
    console.log(
      'My Score 1st Puzzle = ',
      sumArray(getRoundTotal_1stPuzzle(rounds))
    );
    console.log(
      'My Score 2nd Puzzle = ',
      sumArray(getRoundTotal_2ndPuzzle(rounds))
    );
  });
};

puzzle_Day_2();
