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
        let match = distributions[distributions.indexOf(array + '')];
        if (match) {
            console.log(JSON.stringify(match));
            let cycles = distributions.length - distributions.indexOf(match);
            return [distributions.length + 1, cycles];
        } else {
            distributions.push(array + '');
        }
    }
};

assert.deepEqual(distribute(test), [5, 4]);
assert.deepEqual(distribute([1, 1]), [3, 2]);
console.log(distribute(input));
