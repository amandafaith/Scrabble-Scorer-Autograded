// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

let word = "";

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

function transform(oldPointStructure) {
  let newPointStructure = {};

  for (let pointValue in oldPointStructure) {
    let letters = oldPointStructure[pointValue];

    for (let i = 0; i < letters.length; i++) {
      let letter = letters[i].toLowerCase();
      newPointStructure[letter] = Number(pointValue);
    }
  }
  //   console.log("letter a: ", newPointStructure.a);
  //   console.log("Letters with score '4':", oldPointStructure[4]);
  //   console.log("3rd letter within the key '4' array:", oldPointStructure[4][2]);

  return newPointStructure;
}

const newPointStructure = transform(oldPointStructure);

let scrabbleScorer = function (word) {
  word = word.toUpperCase();
  let score = 0;

  for (let i = 0; i < word.length; i++) {
    let letter = word[i].toLowerCase();
    score += newPointStructure[letter];
  }
  return score;
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "\n";

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      }
    }
  }
  return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  word = input.question("Let's play some scrabble! Enter a word: ");
}

let simpleScorer = function (word) {
  let score = word.length;
  return score;
};

let vowelBonusScorer = function (word) {
  let score = 0;

  for (let i = 0; i < word.length; i++) {
    let letter = word[i].toLowerCase();
    if ("aeiou".includes(letter)) {
      score += 3;
    } else if ("bcdfghjklmnpqrstvwxyz".includes(letter)) {
      score += 1;
    }
  }
  return score;
};

const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScorer,
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 points, consonants are 1 point.",
    scorerFunction: vowelBonusScorer,
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scorerFunction: scrabbleScorer,
  },
];

function scorerPrompt() {
  let num = Number(
    input.question(
      "Which scoring algorithm would you like to use?\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: "
    )
  );

  if (num === 0) {
    console.log("Algorithm Name: ", scoringAlgorithms[0].name);
    console.log(
      `Score for '${word}': ${scoringAlgorithms[0].scorerFunction(word)}`
    );
  } else if (num === 1) {
    console.log("Algorithm Name: ", scoringAlgorithms[1].name);
    console.log(
      `Score for '${word}': ${scoringAlgorithms[1].scorerFunction(word)}`
    );
  } else if (num === 2) {
    console.log("Algorithm Name: ", scoringAlgorithms[2].name);
    console.log(
      `Score for '${word}': ${scoringAlgorithms[2].scorerFunction(word)}`
    );
  }
}

function runProgram() {
  initialPrompt();
  scorerPrompt();
  //   console.log(oldScrabbleScorer(word));
  //   console.log(simpleScorer(word));
  //   console.log(vowelBonusScorer(word));

  //   console.log(transform(oldPointStructure));
  //   console.log(newPointStructure);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};
