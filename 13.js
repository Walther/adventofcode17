const assert = require("assert");

const firewallWalk = input => {
  // String processing
  let array = input.split("\n");
  let firewall = [];
  array.forEach(row => {
    let keyVal = row.split(": ").map(Number);
    firewall[keyVal[0]] = keyVal[1];
  });
  // Initialize guards
  let depths = firewall.map(layer => layer);
  let guards = depths.map((range, layer) => {
    return {
      layer,
      position: 0,
      range,
      direction: "down"
    };
  });
  // Walk through the firewall
  let severity = 0;
  for (
    let packetPosition = 0;
    packetPosition < firewall.length;
    packetPosition++
  ) {
    currentGuard = guards[packetPosition];
    if (currentGuard && currentGuard.position === 0) {
      // The packet is always moving on the topmost layer
      severity += packetPosition * depths[packetPosition];
    }
    // Update guard positions
    guards.forEach((guard, layer) => {
      if (guard !== null) {
        if (guard.direction === "down") {
          if (guard.position === guard.range - 1) {
            guard.direction = "up";
            guard.position--;
          } else {
            guard.position++;
          }
        } else if (guard.direction === "up") {
          if (guard.position === 0) {
            guard.direction = "down";
            guard.position++;
          } else {
            guard.position--;
          }
        }
      }
    });
  }
  return severity;
};

const test = `0: 3
1: 2
4: 4
6: 4`;

assert.equal(firewallWalk(test), 24);

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

console.log(firewallWalk(input));
