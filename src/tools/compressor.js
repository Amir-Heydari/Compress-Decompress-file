
export function lz77Compress(input, windowSize = 2048) {
    let compressed = [];
    let i = 0;

    while (i < input.length) {
        let matchLength = 0;
        let matchDistance = 0;

        for (let j = Math.max(0, i - windowSize); j < i; j++) {
            let length = 0;

            // Match length calculation
            while (input[j + length] === input[i + length] && length < 255) {
                length++;
            }

            // Keep track of the best match found
            if (length > matchLength) {
                matchLength = length;
                matchDistance = i - j;
            }
        }

        // If we have a match, store the match as (distance, length)
        if (matchLength > 3) {
            compressed.push([matchDistance, matchLength, input[i + matchLength]]);
            i += matchLength + 1;
        } else {
            // If no match, output the raw byte
            compressed.push([0, 0, input[i]]);
            i++;
        }
    }

    return compressed;
}
export function compressUsingLZW(uncompressed) {
    let dictionary = {};
    for (let i = 0; i < 256; i++) {
        dictionary[String.fromCharCode(i)] = i;
    }

    let word = '';
    let result = [];
    let dictSize = 256;

    for (let i = 0, len = uncompressed.length; i < len; i++) {
        let curChar = uncompressed[i];
        let joinedWord = word + curChar;

        if (dictionary.hasOwnProperty(joinedWord)) {
            word = joinedWord;
        }
        else {
            result.push(dictionary[word]);
            dictionary[joinedWord] = dictSize++;
            word = curChar;
        }
    }

    if (word !== '') {
        result.push(dictionary[word]);
    }

    return result;
}
export function deCompressUsingLZW(compressed) {
    let dictionary = {};
    for (let i = 0; i < 256; i++) {
        dictionary[i] = String.fromCharCode(i);
    }

    let word = String.fromCharCode(compressed[0]);
    let result = word;
    let entry = '';
    let dictSize = 256;

    for (let i = 1, len = compressed.length; i < len; i++) {
        let curNumber = compressed[i];

        if (dictionary[curNumber] !== undefined) {
            entry = dictionary[curNumber];
        }
        else {
            if (curNumber === dictSize) {
                entry = word + word[0];
            }
            else {
                throw 'Error in processing';
                return null;
            }
        }

        result += entry;

        // Add word + entry[0] to dictionary
        dictionary[dictSize++] = word + entry[0];

        word = entry;
    }

    return result;
}
