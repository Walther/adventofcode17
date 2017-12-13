const assert = require("assert");

const firewallWalk = (input, delay) => {
  // String processing
  let array = input.split("\n");
  let depths = [];
  array.forEach(row => {
    let keyVal = row.split(": ").map(Number);
    depths[keyVal[0]] = keyVal[1];
  });
  // Initialize guards
  let updateGuards = currentTime => {
    return depths.map(range => {
      // With delay 0, position should be 0
      // With delay 1, position should be 1
      // With bigger delays, position should be a triangle wave function of the range
      let position =
        Math.abs(currentTime + delay + range - 1) % (2 * (range - 1)) -
        (range - 1);
      return {
        position,
        range
      };
    });
  };
  let guards = updateGuards(0);
  // Walk through the firewall
  let severity = 0;
  let caught = false;
  for (
    let packetPosition = 0;
    packetPosition < depths.length;
    packetPosition++
  ) {
    currentGuard = guards[packetPosition];
    if (currentGuard && currentGuard.position === 0) {
      // The packet is always moving on the topmost layer
      caught = true;
      severity += packetPosition * depths[packetPosition];
    }
    // Update guard positions
    guards = updateGuards(packetPosition + 1);
    //console.log(JSON.stringify(guards, null, 2));
  }
  return [severity, caught];
};

const part1 = input => {
  return firewallWalk(input, 0)[0];
};

const part2 = input => {
  let delay = 0;
  while (true) {
    if (delay !== 0 && delay % 10000 === 0) {
      // For measuring speed
      console.log("delay: " + delay);
    }
    let caught = firewallWalk(input, delay)[1];
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
