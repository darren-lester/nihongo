// Author: Darren Lester
// Email: dsslester@gmail.com
// License: MIT

"use strict";

const assert = require("chai").assert;
const equals = require("array-equal");
const nihongo = require("../nihongo");

const japaneseSentence = "私はクッキーが大好きです。";

describe("parseHiragana", function(){
    it("should return [] for a string with no hiragana", function(){
        assert.equal([].length,
        nihongo.parseHiragana("String with no hiragana").length
        );
    });

    it("should return all hiragana from a string in order of occurence",
        function(){
            const expected = ["は", "が", "き", "で", "す"];
            const result = nihongo.parseHiragana(japaneseSentence);
            equals(expected, result);
        }
    );
});

describe("parseKatakana", function(){
    it("should return [] for a string with no katakana", function(){
        assert.equal([].length,
        nihongo.parseKatakana("String with no katakana").length
        );
    });

    it("should return all katakana from a string in order of occurence",
        function(){
            const expected = ["ク", "ッ", "キ", "ー"];
            const result = nihongo.parseKatakana(japaneseSentence);
            equals(expected, result);
        }
    );
});

describe("parseKana", function(){
    it("should return [] for a string with no kana",
        function(){
            assert.equal([].length,
            nihongo.parseKana("String with no kana").length
            );
        }
    );

    it("should return all kana from a string in order of occurence",
        function(){
            const expected = ["は", "ク", "ッ", "キ", "ー",
            "が", "き", "で", "す"];
            const result = nihongo.parseKana(japaneseSentence);
            equals(expected, result);
        }
    );
});

describe("parseKanji", function(){
    it("should return [] for a string with no kanji", function(){
        assert.equal([].length,
        nihongo.parseKanji("String with no kanji").length);
    });

    it("should return all kanji from a string in order of occurrence",
        function(){
            const expected = ["文", "漢", "字"];
            const result = nihongo.parseKanji("この文には漢字があります。");

            equals(expected, result);
        }
    );
});

describe("parseKanjiCompounds", function(){
    it("should return [] for a string with no kanji", function(){
        assert.equal([].length,
        nihongo.parseKanjiCompounds("String with no kanji compunds").length);
    });

    it("should return all kanji compounds from a string in order of occurrence",
        function(){
            const expected = ["私", "大好"];
            const result = nihongo.parseKanjiCompounds(japaneseSentence);
            equals(expected, result);
        }
    );
});

describe("parseJapanese", function(){
    it("should return [] for a string with no Japanese", function(){
        assert.equal([].length,
        nihongo.parseJapanese("String with no Japanese").length);
    });

    it("should return all Japanese segments from a \
        mixed language string", function(){
        const mixedSentence = "This is an English sentence. \
        This sentence contains both 日本語 and English. これは日本語の文。";
        const expected = ["日本語", "これは日本語の文"];
        equals(expected, nihongo.parseJapanese(mixedSentence));
    });
});
