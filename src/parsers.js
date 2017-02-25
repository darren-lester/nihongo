// Author: Darren Lester
// Email: dsslester@gmail.com
// License: MIT

"use strict";

const analysers = require("./analysers");

// returns an array of all characters in a string that fulfill a condition
function basicParser(condition, str) {
    let result = [];

    for (let i = 0; i < str.length; ++i) {
        if (condition(str[i])) {
            result.push(str[i]);
        }
    }

    return result;
}

// returns an array of all sequences of characters in a string that fulfill
// a condition
function accumulativeParser(condition, str) {
    let accumulations = [];
    let accumulator = "";

    for (let i = 0; i < str.length; ++i) {
        let ch = str[i];

        if (condition(ch)) {
            accumulator += ch;
        } else if (accumulator !== "") {
            accumulations.push(accumulator);
            accumulator = "";
        }
    }

    return accumulations;
}

module.exports = {
    parseHiragana: basicParser.bind(null, analysers.isHiragana),
    parseKatakana: basicParser.bind(null, analysers.isKatakana),
    parseKana: basicParser.bind(null, analysers.isKana),
    parseKanji: basicParser.bind(null, analysers.isKanji),
    parseKanjiCompounds: accumulativeParser.bind(null, analysers.isKanji),
    parseJapanese: accumulativeParser.bind(null, analysers.isJapanese)
};
