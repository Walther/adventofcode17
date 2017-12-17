const assert = require("assert");

const rotate = (array, n) => {
  n = n % array.length;
  return array.slice(n, array.length).concat(array.slice(0, n));
};

const spinlock = input => {
  let array = [0];
  for (let i = 1; i <= 2017; i++) {
    array = rotate(array, input);
    array.push(i);
  }
  return array[0];
};

test = 3;
input = 363;

assert.equal(spinlock(test), 638);
console.log(spinlock(input));
