// Author: Darren Lester
// Email: dsslester@gmail.com
// License: MIT

"use strict";

const analysers = require("./analysers");

// returns an array of all characters in a string that fulfill a condition
function basicParser(str, condition) {
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
function accumulativeParser(str, condition) {
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

// return array of all hiragana in a string
function parseHiragana(str) {
    return basicParser(str, analysers.isHiragana);
}

// return array of all katakana in a string
function parseKatakana(str) {
    return basicParser(str, analysers.isKatakana);
}

// return array of all kana in a string
function parseKana(str) {
    return basicParser(str, analysers.isKana);
}

// return array of all kanji in a string
function parseKanji(str) {
    return basicParser(str, analysers.isKanji);
}

// return array of all kanji compounds in a string
function parseKanjiCompounds(str) {
    return accumulativeParser(str, analysers.isKanji);
}

// return an array of all sections of Japanese in a string
function parseJapanese(str) {
    return accumulativeParser(str, analysers.isJapanese);
}

module.exports = {
    parseHiragana: parseHiragana,
    parseKatakana: parseKatakana,
    parseKana: parseKana,
    parseKanji: parseKanji,
    parseKanjiCompounds: parseKanjiCompounds,
    parseJapanese: parseJapanese
};
