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
console.log(spinlock(input));
