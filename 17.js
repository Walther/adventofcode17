const assert = require("assert");

test = 3;
input = 363;

const spinlock = step => {
  let array = [0];
  let currentPos = 0;
  for (let i = 1; i <= 2017; i++) {
    currentPos = (step + currentPos) % array.length + 1;
    array.splice(currentPos, 0, i);
  }
  return array[array.indexOf(2017) + 1 % array.length];
};

assert.equal(spinlock(test), 638);

const spinlock2 = step => {
  let arrayLength = 1; // initial list with just zero as the sole element
  let currentPos = 0;
  let value;
  for (let i = 1; i <= 50e6; i++) {
    currentPos = (step + currentPos) % arrayLength;
    if (currentPos === 0) {
      value = i;
    }
    currentPos++;
    arrayLength++;
  }
  return value;
};

console.log([spinlock(input), spinlock2(input)]);
