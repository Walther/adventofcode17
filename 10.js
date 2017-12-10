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
