# nihongo.js

## Install

```bash
npm install nihongo
```

## API
nihongo.js has methods for analysing characters and sentences and parsing sentences.

### Analysis

```javascript
// Determine whether or not a character is a hiragana
nihongo.isHiragana("あ"); // true

// Determine whether or not a character is a katakana
nihongo.isKatakana("ア"); // true

// Determine whether or not a character is a kana
nihongo.isKana("あ"); // true
nihongo.isKana("ア"); // true

// Determine whether or not a character is a kanji
nihongo.isKanji("木"); // true

// Determine whether or not a character is Japanese
nihongo.isJapanese("あ"); // true
nihongo.isJapanese("ア"); // true
nihongo.isJapanese("木"); // true
nihongo.isJapanese("a"); // false

// Determine whether or not a character is a kyouiku kanji
nihongo.isKyouikuKanji("木"); // true

// Determine whether or not a character is a jouyou kanji
nihongo.isJouyouKanji("木"); // true

// Get the kyouiku grade of a kanji
nihongo.getKyouikuGrade("木"); // 1

// Determine whether or not a string contains hiragana
nihongo.hasHiragana("これはクッキーです。"); // true

// Determine whether or not a string contains katakana
nihongo.hasKatakana("これはクッキーです。"); // true

// Determine whether or not a string contains kana
nihongo.hasKana("これはクッキーです。"); // true

// Determine whether or not a string contains kanji
nihongo.hasKanji("これはクッキーです。"); // false

// Determine whether or not a string contains Japanese
nihongo.hasJapanese("This sentence has no Japanese"); // false

// Determine whether or not a string contains hiragana, katakana and kanji
nihongo.contains("これはクッキーです。"); // {hiragana: true, katakana: true, kanji: false}
```

### Parsing

```javascript
// Extract an array of hiragana from a string
nihongo.parseHiragana("これはクッキーです。"); // ["こ", "れ", "は", "で", "す"]

// Extract an array of katakana from a string
nihongo.parseKatakana("これはクッキーです。"); // ["ク", "ッ", "キ", "ー"]

// Extract an array of kana from a string
nihongo.parseKana("これはクッキーです。"); // ["こ", "れ", "は", "ク", "ッ", "キ", "ー", "で", "す"]

// Extract an array of kanji from a string
nihongo.parseKanji("私はクッキーが大好きです。"); // ["私", "大", "好"]

// Extract an array of consecutive kanji from a string
nihongo.parseKanjiCompounds("私はクッキーが大好きです。"); // ["私", "大好"]

// Extract an array if all sections of Japanese from a string
nihongo.parseJapanese("This is an English sentence. This sentence contains both 日本語 and English. これは日本語の文。"); // ["日本語", "これは日本語の文"]
```

## Tests

```bash
$ npm install
$ npm test
```

## License
[MIT](LICENSE)
