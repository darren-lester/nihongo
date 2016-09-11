// Author: Darren Lester
// Email: dsslester@gmail.com
// License: MIT

"use strict";

const analysers = require("./src/analysers");
const parsers = require("./src/parsers");

const nihongo = {
	// Character analysis
	isHiragana: analysers.isHiragana,
	isKatakana: analysers.isKatakana,
	isKana: analysers.isKana,
	isKanji: analysers.isKanji,
	isJapanese: analysers.isJapanese,
	isKyouikuKanji: analysers.isKyouikuKanji,
	isJouyouKanji: analysers.isJouyouKanji,
	getKyouikuGrade: analysers.getKyouikuGrade,

	// Sentence analysis
	hasHiragana: analysers.hasHiragana,
	hasKatakana: analysers.hasKatakana,
	hasKana: analysers.hasKana,
	hasKanji: analysers.hasKanji,
	hasJapanese: analysers.hasJapanese,
	contains: analysers.contains,

	// Parsers
	parseHiragana: parsers.parseHiragana,
	parseKatakana: parsers.parseKatakana,
	parseKana: parsers.parseKana,
	parseKanji: parsers.parseKanji,
	parseKanjiCompounds: parsers.parseKanjiCompounds,
	parseJapanese: parsers.parseJapanese
};

module.exports = nihongo;
