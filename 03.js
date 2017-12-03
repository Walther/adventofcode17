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

const nearbySum = (coords, memory) => {
    // Hey what a lovely mess!
    // This could probably be optimized to something cleaner
    // But with a modern editor this was rather quick to create
    // And given this is just for a little problem, not production use,
    // I think this is proper scoping of effort.
    let sum = 0;
    try {
        let eastVal = memory[coords[0] + 1][coords[1]];
        if (eastVal) {
            sum += eastVal;
        }
    } catch (error) {}
    try {
        let northEastVal = memory[coords[0] + 1][coords[1] + 1];
        if (northEastVal) {
            sum += northEastVal;
        }
    } catch (error) {}
    try {
        let northVal = memory[coords[0]][coords[1] + 1];
        if (northVal) {
            sum += northVal;
        }
    } catch (error) {}
    try {
        let northWestVal = memory[coords[0] - 1][coords[1] + 1];
        if (northWestVal) {
            sum += northWestVal;
        }
    } catch (error) {}
    try {
        let westVal = memory[coords[0] - 1][coords[1]];
        if (westVal) {
            sum += westVal;
        }
    } catch (error) {}
    try {
        let southWestVal = memory[coords[0] - 1][coords[1] - 1];
        if (southWestVal) {
            sum += southWestVal;
        }
    } catch (error) {}
    try {
        let southVal = memory[coords[0]][coords[1] - 1];
        if (southVal) {
            sum += southVal;
        }
    } catch (error) {}
    try {
        let southEastVal = memory[coords[0] + 1][coords[1] - 1];
        if (southEastVal) {
            sum += southEastVal;
        }
    } catch (error) {}
    return sum;
};

const spiral = index => {
    let coords = [0, 0]; // x,y
    let current = 1; // current number we're at
    let directions = [0, 1, 2, 3];
    let direction = 0;
    let memory = [[1]]; // Part 2: coordinate grid with memory values
    let part2val;
    // Counter for how much the spiral edge needs to grow
    for (spiralIncrement = 1; true; spiralIncrement++) {
        // Two edges of the spiral have same size:
        // Same amount of increment twice, then increase spiralInc
        for (repeat = 0; repeat < 2; repeat++) {
            // Take max of spiralIncrement steps towards the direction we're heading
            for (i = 0; i < spiralIncrement; i++) {
                if (current === index) {
                    return [manhattan(coords), part2val];
                }

                coords = stepToDirection(coords, direction);
                current++;
                // Part 2
                if (!memory[coords[0]]) {
                    // JS doesn't like when a 2d array index doesn't exist
                    // so we have to initialize the empty list :)
                    memory[coords[0]] = [];
                }

                let sum = nearbySum(coords, memory);
                memory[coords[0]][coords[1]] = sum;
                // As per the exercise, we only care where the memory value exceeds the input value
                if (sum > input && !part2val) {
                    part2val = sum;
                }
            }
            direction = directions[(direction + 1) % directions.length];
        }
    }
};

assert.equal(spiral(1)[0], 0);
assert.equal(spiral(12)[0], 3);
assert.equal(spiral(23)[0], 2);
assert.equal(spiral(1024)[0], 31);

console.log(spiral(input));
