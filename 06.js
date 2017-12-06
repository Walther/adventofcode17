const assert = require('assert');

let test = [2, 4, 1, 2];
let input = [11, 11, 13, 7, 0, 15, 5, 5, 4, 4, 1, 1, 7, 1, 15, 11];

const distribute = array => {
    let distributions = []; // for storing the different states
    while (true) {
        let value = array.reduce((a, b) => Math.max(a, b));
        let start = array.indexOf(value);
        array[start] = 0; // zero the current bank
        for (i = 1; i <= value; i++) {
            // the value is spread over to the other banks
            let index = (start + i) % array.length;
            array[index] += 1;
        }
        // check whether we've been in this state before
        if (distributions.filter(state => state === array + '').length > 0) {
            return distributions.length + 1;
        } else {
            distributions.push(array + '');
        }
    }
};

assert.equal(distribute(test), 5);
console.log(distribute(input));
