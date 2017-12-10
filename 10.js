const assert = require('assert');

const rotate = (array, n) => {
    return array.slice(n, array.length).concat(array.slice(0, n));
};

const circularHash = (size, lengths) => {
    let array = Array.from(Array(size).keys()); // range 0..size-1
    let position = 0;
    lengths.forEach((length, index) => {
        // Rotate list so that starting point is at zero
        array = rotate(array, position);
        // Splice the list to reversepart + rest
        let part1 = array.slice(0, length).reverse();
        let part2 = array.slice(length, size);
        // Put the array back together
        array = part1.concat(part2);
        // Rotate list back to original rotation state
        array = rotate(array, size - position);
        // Increase position by length plus iteration count
        position = (position + length + index) % size;
    });
    // Return the hash
    return array[0] * array[1];
};

const test = [3, 4, 1, 5];
const input = [
    129,
    154,
    49,
    198,
    200,
    133,
    97,
    254,
    41,
    6,
    2,
    1,
    255,
    0,
    191,
    108
];

assert.equal(circularHash(5, test), 12);
console.log(circularHash(256, input));

// Part 2

const circularHash2 = string => {
    let size = 256;
    let array = Array.from(Array(size).keys()); // range 0..size-1
    // Convert string to array of bytes
    let input = string.split('').map(char => char.charCodeAt());
    // Append magical sprinkles
    input = input.concat([17, 31, 73, 47, 23]);
    let position = 0;
    let skipSize = 0;
    for (let round = 0; round < 64; round++) {
        input.forEach(length => {
            // Rotate list so that starting point is at zero
            array = rotate(array, position);
            // Splice the list to reversepart + rest
            let part1 = array.slice(0, length).reverse();
            let part2 = array.slice(length, size);
            // Put the array back together
            array = part1.concat(part2);
            // Rotate list back to original rotation state
            array = rotate(array, size - position);
            // Increase position by length plus iteration count
            position = (position + length + skipSize) % size;
            // Increase skipSize
            skipSize++;
        });
    }
    // Split array to chunks, 16 * 16
    let chunk = 16;
    let chunks = [];
    for (let part = 0; part < array.length; part += chunk) {
        chunks.push(array.slice(part, part + chunk));
    }
    // Compute the dense hash from the sparse one
    array = chunks.map(chunk => chunk.reduce((a, b) => a ^ b));
    // Return the hash
    let str = array
        .map(number => {
            let hex = number.toString(16);
            // Left-pad if necessary
            if (hex.length === 1) {
                hex = '0' + hex;
            }
            return hex;
        })
        .join('');
    return str;
};

assert.equal(circularHash2('1,2,3'), '3efbe78a8d82f29979031a4aa0b16a9d');
assert.equal(circularHash2(''), 'a2582a3a0e66e6e86e3812dcb672a272');
assert.equal(circularHash2('AoC 2017'), '33efeb34ea91902bb2f59c9920caa6cd');
assert.equal(circularHash2('1,2,4'), '63960835bcdc130f0b66d7ff4f6a5a8e');

let input2 = input.join(',');
console.log(circularHash2(input2));
