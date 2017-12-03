const assert = require('assert');
const input = 347991;

const manhattan = ([x, y]) => {
    return Math.abs(x) + Math.abs(y);
};

// Zero for initial direction i.e. east
// Cycling with the spiral i.e. counter-clockwise
const stepToDirection = (coords, direction) => {
    switch (direction) {
        case 0:
            return [coords[0] + 1, coords[1]];
            break;
        case 1:
            return [coords[0], coords[1] + 1];
            break;
        case 2:
            return [coords[0] - 1, coords[1]];
            break;
        case 3:
            return [coords[0], coords[1] - 1];
            break;
        default:
            break;
    }
};

const distance = index => {
    let coords = [0, 0]; // x,y
    let current = 1; // current number we're at
    let directions = [0, 1, 2, 3];
    let direction = 0;
    // Counter for how much the spiral edge needs to grow
    for (spiralIncrement = 1; true; spiralIncrement++) {
        // Two edges of the spiral have same size:
        // Same amount of increment twice, then increase spiralInc
        for (repeat = 0; repeat < 2; repeat++) {
            // Take max of spiralIncrement steps towards the direction we're heading
            for (i = 0; i < spiralIncrement; i++) {
                if (current === index) {
                    return manhattan(coords);
                }
                coords = stepToDirection(coords, direction);
                current++;
            }
            direction = directions[(direction + 1) % directions.length];
        }
    }
};

assert.equal(distance(1), 0);
assert.equal(distance(12), 3);
assert.equal(distance(23), 2);
assert.equal(distance(1024), 31);

console.log(distance(input));
