const assert = require("assert");

const genA = input => {
  return (input * 16807) % 2147483647;
};

const genB = input => {
  return (input * 48271) % 2147483647;
};

const byteify = input => {
  return input
    .toString(2)
    .padStart(32, "00000000000000000000000000000000")
    .slice(16, 33);
};

const part1 = input => {
  let valueA = input[0];
  let valueB = input[1];
  let judge = 0;
  for (let i = 0; i < 40e6; i++) {
    valueA = genA(valueA);
    valueB = genB(valueB);
    if (byteify(valueA) === byteify(valueB)) {
      judge++;
    }
  }
  console.log(judge);
  return judge;
};

assert.equal(genA(65), 1092455);
assert.equal(genA(1092455), 1181022009);
assert.equal(genB(8921), 430625591);
assert.equal(genB(430625591), 1233683848);

const input = [679, 771];
const test = [65, 8921];
part1(input);
