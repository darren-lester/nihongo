// Author: Darren Lester
// Email: dsslester@gmail.com
// License: MIT

"use strict";

const kyouikuKanji = require("kyoiku-kanji");
const jouyouKanji = require("joyo-kanji").kanji;
const isKanji = require("iskanji");
const includes = require("array-includes");
const some = require("string-some");

//////// CHARACTER ANALYSIS ////////

// determine whether a character is a hiragana character
function isHiragana(ch) {
    return ch >= "\u3040" && ch <= "\u309f";
}

// determine whether a character is a katakana character
function isKatakana(ch) {
    return ch >= "\u30a0" && ch <= "\u30ff";
}

// determine whether a character is a kana character
function isKana(ch) {
    return isHiragana(ch) || isKatakana(ch);
}

// determine whether a character is a Japanese character
function isJapanese(ch) {
    return isKana(ch) || isKanji(ch);
}

// determine whether a character is a kyouiku kanji character
function isKyouikuKanji(ch) {
    return includes(kyouikuKanji.grade1, ch) ||
    includes(kyouikuKanji.grade2, ch) ||
    includes(kyouikuKanji.grade3, ch) ||
    includes(kyouikuKanji.grade4, ch) ||
    includes(kyouikuKanji.grade5, ch) ||
    includes(kyouikuKanji.grade6, ch);
}

// determine whether a character is a jouyou kanji character
function isJouyouKanji(ch) {
    return includes(jouyouKanji, ch);
}

// return the grade of a kyouiku kanji
function getKyouikuGrade(ch) {
    let grade;

    if (includes(kyouikuKanji.grade1, ch)) {
        grade = 1;
    }
    else if (includes(kyouikuKanji.grade2, ch)) {
        grade = 2;
    }
    else if (includes(kyouikuKanji.grade3, ch)) {
        grade = 3;
    }
    else if (includes(kyouikuKanji.grade4, ch)) {
        grade = 4;
    }
    else if (includes(kyouikuKanji.grade5, ch)) {
        grade = 5;
    }
    else if (includes(kyouikuKanji.grade6, ch)) {
        grade = 6;
    }

    return grade;
}

//////// SENTENCE ANALYSIS ////////

// determine whether a string contains hiragana characters
function hasHiragana(str) {
    return some(str, isHiragana);
}

// determine whether a string contains katakana characters
function hasKatakana(str) {
    return some(str, isKatakana);
}

// determine whether a string contains kana characters
function hasKana(str) {
    return some(str, isKana);
}

function hasKanji(str) {
    return some(str, isKanji);
}

// determine whether a string contains Japanese characters
function hasJapanese(str) {
    return some(str, isJapanese);
}

// determine whether a string contains hiragana, katakana or kanji characters
function contains(str) {
    return {
        hiragana: hasHiragana(str),
        katakana: hasKatakana(str),
        kanji: hasKanji(str)
    };
}

module.exports = {
    // CHARACTER ANALYSIS
    isHiragana: isHiragana,
    isKatakana: isKatakana,
    isKana: isKana,
    isKanji: isKanji,
    isJapanese: isJapanese,
    isKyouikuKanji: isKyouikuKanji,
    isJouyouKanji: isJouyouKanji,
    getKyouikuGrade: getKyouikuGrade,

    // SENTENCE ANALYSIS
    hasHiragana: hasHiragana,
    hasKatakana: hasKatakana,
    hasKana: hasKana,
    hasKanji: hasKanji,
    hasJapanese: hasJapanese,
    contains: contains
};
