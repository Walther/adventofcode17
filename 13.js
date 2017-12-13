const assert = require("assert");

const firewallWalk = (depths, delay) => {
  // Initialize guards
  let getCaught = time => {
    // Packet position = time, because we move one layer per unit time
    let range = depths[time]; // the range of the guard at the level
    if (!range) {
      return false; // No guard here
    } else
      return (
        // if range is null or 0, there's no guard
        // if range is 1, it's always there
        // if range is 2, it'll be there every second tick
        // if range is 3, it'll be there every 4th tick
        // if range is 4, it'll be there every 6th
        // if range is 5, it'll be there every 8th
        // if range is 6, it'll be there every 10th
        (time + delay) % (2 * (range - 1)) === 0
      );
  };
  // Walk through the firewall
  let severity = 0;
  let caught = false;
  for (
    let packetPosition = 0;
    packetPosition < depths.length;
    packetPosition++
  ) {
    if (getCaught(packetPosition)) {
      caught = true;
      severity += packetPosition * depths[packetPosition];
    }
  }
  return [severity, caught];
};

const inputToDepths = input => {
  // String processing
  let array = input.split("\n");
  let depths = [];
  array.forEach(row => {
    let keyVal = row.split(": ").map(Number);
    depths[keyVal[0]] = keyVal[1];
  });
  return depths;
};

const part1 = input => {
  let depths = inputToDepths(input);
  return firewallWalk(depths, 0)[0];
};

const part2 = input => {
  let delay = 0;
  let depths = inputToDepths(input);
  while (true) {
    let caught = firewallWalk(depths, delay)[1];
    if (!caught) {
      return delay;
      break;
    } else {
      delay++;
    }
  }
};

const test = `0: 3
1: 2
4: 4
6: 4`;

assert.equal(part1(test), 24);
assert.equal(part2(test), 10);

const input = `0: 5
1: 2
2: 3
4: 4
6: 6
8: 4
10: 6
12: 10
14: 6
16: 8
18: 6
20: 9
22: 8
24: 8
26: 8
28: 12
30: 12
32: 8
34: 8
36: 12
38: 14
40: 12
42: 10
44: 14
46: 12
48: 12
50: 24
52: 14
54: 12
56: 12
58: 14
60: 12
62: 14
64: 12
66: 14
68: 14
72: 14
74: 14
80: 14
82: 14
86: 14
90: 18
92: 17`;

console.log(part1(input));
console.log(part2(input));
