const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const dictionariesPath = path.join(root, "data", "dictionaries.js");
const source = fs.readFileSync(dictionariesPath, "utf8");
const context = { window: {} };

vm.createContext(context);
vm.runInContext(source, context);

const dictionaries = context.window.KEYWORD_GAME_DICTIONARIES;
const expectedCounts = {
  charades: { easy: 100, normal: 100, hard: 100 },
  charadesFunny: { all: 139 },
  silentShout: { easy: 100, normal: 100, hard: 100 },
  telestrations: { easy: 100, normal: 100, hard: 100 },
};

let hasError = false;

function fail(message) {
  hasError = true;
  console.error(`ERROR ${message}`);
}

function warn(message) {
  console.warn(`WARN ${message}`);
}

for (const [dictionaryName, expectedLevels] of Object.entries(expectedCounts)) {
  const dictionary = dictionaries[dictionaryName];
  if (!dictionary) {
    fail(`${dictionaryName} dictionary is missing`);
    continue;
  }

  for (const [level, expectedCount] of Object.entries(expectedLevels)) {
    const words = dictionary[level];
    if (!Array.isArray(words)) {
      fail(`${dictionaryName}.${level} is missing`);
      continue;
    }

    if (words.length !== expectedCount) {
      fail(`${dictionaryName}.${level} expected ${expectedCount}, got ${words.length}`);
    } else {
      console.log(`OK ${dictionaryName}.${level}: ${words.length}`);
    }

    const emptyWords = words.filter((word) => !String(word).trim());
    if (emptyWords.length) {
      fail(`${dictionaryName}.${level} has ${emptyWords.length} empty words`);
    }

    const seen = new Set();
    const duplicates = new Set();
    for (const word of words) {
      if (seen.has(word)) duplicates.add(word);
      seen.add(word);
    }

    if (duplicates.size) {
      warn(`${dictionaryName}.${level} duplicates: ${Array.from(duplicates).join(", ")}`);
    }

    const veryLongWords = words.filter((word) => word.length >= 18);
    if (veryLongWords.length) {
      warn(`${dictionaryName}.${level} long words: ${veryLongWords.slice(0, 6).join(", ")}`);
    }
  }
}

if (hasError) {
  process.exit(1);
}
