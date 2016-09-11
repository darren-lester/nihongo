// Author: Darren Lester
// Email: dsslester@gmail.com
// License: MIT

"use strict";

const assert = require("chai").assert;
const includes = require("array-includes");
const nihongo = require("../nihongo");
const kyouikuKanji = require("kyoiku-kanji");
const jouyouKanji = require("joyo-kanji").kanji;
const hiragana = require("basic-hiragana");
const katakana = require("basic-katakana");
const romanCharacters = ["a", "b", "c", "d", "e", "f", "g", "h", "i",
        "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w",
        "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I",
        "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W",
        "X", "Y", "Z"];
const allKyouikuKanji = kyouikuKanji.grade1.concat(kyouikuKanji.grade2,
kyouikuKanji.grade3, kyouikuKanji.grade4,
kyouikuKanji.grade5, kyouikuKanji.grade6);

const nonKyouikuKanji = jouyouKanji.filter(function(ch){
    return !includes(allKyouikuKanji, ch);
});

function assertArray(array, callback, expected) {
    for (var i in array) {
        assert.equal(expected, callback(array[i]));
    }
}

function assertRoman(expected, callback) {
    it("should return " + expected + " for roman characters", function(){
        assertArray(romanCharacters, callback, expected);
    });
}

function assertHiragana(expected, callback) {
    it("should return " + expected + " for hiragana", function(){
        assertArray(hiragana, callback, expected);
    });
}

function assertKatakana(expected, callback) {
    it("should return " + expected + " for katakana", function(){
        assertArray(katakana, callback, expected);
    });
}

function assertKanji(expected, callback) {
    it("should return " + expected + " for kanji", function(){
        assertArray(jouyouKanji, callback, expected);
    });
}

describe("isHiragana", function(){
    const testFunc = nihongo.isHiragana;
    assertRoman(false, testFunc);
    assertHiragana(true, testFunc);
    assertKatakana(false, testFunc);
    assertKanji(false, testFunc);
});

describe("isKatakana", function(){
    const testFunc = nihongo.isKatakana;
    assertRoman(false, testFunc);
    assertHiragana(false, testFunc);
    assertKatakana(true, testFunc);
    assertKanji(false, testFunc);
});

describe("isKana", function(){
    const testFunc = nihongo.isKana;
    assertRoman(false, testFunc);
    assertHiragana(true, testFunc);
    assertKatakana(true, testFunc);
    assertKanji(false, testFunc);
});

describe("isKanji", function(){
    const testFunc = nihongo.isKanji;
    assertRoman(false, testFunc);
    assertHiragana(false, testFunc);
    assertKatakana(false, testFunc);
    assertKanji(true, testFunc);
});

describe("isJapanese", function(){
    it("should return false for english characters", function(){
        assertRoman(false, nihongo.isJapanese);
    });

    it("should return true for kana", function(){
        assertHiragana(true, nihongo.isJapanese);
        assertKatakana(true, nihongo.isJapanese);
    });

    it("should return true for kanji", function(){
        assertKanji(true, nihongo.isJapanese);
    });
});

describe("isKyouikuKanji", function(){
    it("should return false for non-kyouiku kanji", function(){
        assertArray(nonKyouikuKanji, nihongo.isKyouikuKanji, false);
    });

    it("should return false for kana", function(){
        assertHiragana(false, nihongo.isKyouikuKanji);
        assertKatakana(false, nihongo.isKyouikuKanji);
    });

    it("should return false for English characters", function(){
        assertRoman(false, nihongo.isKyouikuKanji);
    });

    it("should return true for kyouiku kanji", function(){
        assertArray(allKyouikuKanji, nihongo.isKyouikuKanji, true);
    });
});

describe("isJouyouKanji", function(){
    it("should return false for kana", function(){
        assertHiragana(false, nihongo.isKyouikuKanji);
        assertKatakana(false, nihongo.isKyouikuKanji);
    });

    it("should return false for English characters", function(){
        assertRoman(false, nihongo.isKyouikuKanji);
    });

    it("should return true for jouyou kanji", function(){
        assertArray(jouyouKanji, nihongo.isJouyouKanji, true);
    });
});

describe("getKyouikuGrade", function(){
    it("should return undefined for English characters", function(){
        assertRoman(undefined, nihongo.getKyouikuGrade);
    });

    it("should return undefined for kana", function(){
        assertHiragana(undefined, nihongo.getKyouikuGrade);
        assertKatakana(undefined, nihongo.getKyouikuGrade);
    });

    it("should return the correct grade for kyouiku kanji", function(){
        assertArray(kyouikuKanji.grade1, nihongo.getKyouikuGrade, 1);
        assertArray(kyouikuKanji.grade2, nihongo.getKyouikuGrade, 2);
        assertArray(kyouikuKanji.grade3, nihongo.getKyouikuGrade, 3);
        assertArray(kyouikuKanji.grade4, nihongo.getKyouikuGrade, 4);
        assertArray(kyouikuKanji.grade5, nihongo.getKyouikuGrade, 5);
        assertArray(kyouikuKanji.grade6, nihongo.getKyouikuGrade, 6);
    });
});

describe("hasHiragana", function(){
    it("should return false for an English string", function(){
        assert.equal(false, nihongo.hasHiragana("This is an english sentence"));
    });

    it("should return true for a string with a hiragana character",
        function(){
            assert.equal(true,
                nihongo.hasHiragana("The romaji for 'あ' is 'a'")
            );
        }
    );
});

describe("hasKatakana", function(){
    it("should return false for an English string", function(){
        assert.equal(false, nihongo.hasKatakana("This is an english sentence"));
    });

    it("should return true for a string with a katakana character",
        function(){
            assert.equal(true,
                nihongo.hasKatakana("The romaji for 'ア' is 'a'")
            );
        }
    );
});

describe("hasKana", function(){
    it("should return false for an English string", function(){
        assert.equal(false, nihongo.hasKana("This is an english sentence"));
    });

    it("should return true for a string with a hiragana character",
        function(){
            assert.equal(true, nihongo.hasKana("The romaji for 'あ' is 'a'"));
        }
    );

    it("should return true for a string with a katakana character",
        function(){
            assert.equal(true, nihongo.hasKana("The romaji for 'ア' is 'a'"));
        }
    );

    it("should return true for a string with both \
        hiragana and katakana characters", function(){
            assert.equal(true,
                nihongo.hasKana("The kana for 'a' are 'あ' and 'ア'")
            );
        }
    );
});

describe("hasKanji", function(){
    it("should return false for a string without kanji", function(){
        assert.equal(false, nihongo.hasKanji("This sentence has no kanji"));
    });

    it("should return true for a string with a kanji", function(){
        assert.equal(true, nihongo.hasKanji("これは日本語です。"));
    });
});

describe("hasJapanese", function(){
    it("should return false for English strings", function(){
        assert.equal(false, nihongo.hasJapanese("This is an English sentcen"));
    });

    it("should return true for strings with Japanese", function(){
        assert.equal(true,
            nihongo.hasJapanese("This sentence has 日本語 in it.")
        );
    });
});

describe("contains", function(){
    it("should return true for character types present", function(){
        const expected = {
            hiragana: true,
            katakana: true,
            kanji: true
        };

        const result = nihongo.contains("この文にはひらがなもカタカナも漢字がある。");

        for (let prop in expected) {
            assert.equal(expected[prop], result[prop]);
        }
    });

    it("should return false for character types not present", function(){
        const expected = {
            hiragana: false,
            katakana: false,
            kanji: false
        };

        const result = nihongo.contains("This sentence has neither hiragana, \
            katakana or kanji in it.");

        for (let prop in expected) {
            assert.equal(expected[prop], result[prop]);
        }
    });
});
