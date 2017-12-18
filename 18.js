const assert = require("assert");

// Manual init of registers visible in data. No fancy parsing and eval's.
const duet = instructions => {
  let a = 0;
  let b = 0;
  let f = 0;
  let i = 0;
  let p = 0;
  let memory = 0; // for recovering last played tone
  let index = 0;
  while (index < instructions.length) {
    let instruction = instructions[index];
    switch (instruction[0]) {
      case "snd":
        eval("memory = " + instruction[1]);
        break;
      case "set": {
        let toEval = instruction[1] + "= " + instruction[2];
        eval(toEval);
        break;
      }
      case "add": {
        let toEval = instruction[1] + "+= " + instruction[2];
        eval(toEval);
        break;
      }
      case "mul": {
        let toEval = instruction[1] + "*= " + instruction[2];
        eval(toEval);
        break;
      }
      case "mod": {
        let toEval = instruction[1] + "%= " + instruction[2];
        eval(toEval);
        break;
      }
      case "jgz": {
        let toEval = instruction[1] + "> 0";
        if (eval(toEval)) {
          eval("index+=" + instruction[2] + "- 1"); // -1 because we increment at end of loop anyway
        }
        break;
      }
      case "rcv": {
        if (eval(instruction[1] + "!== 0 && memory !== 0")) {
          return memory;
        }
        break;
      }
      default:
        break;
    }
    index++;
  }
};

const parseInput = input => {
  return input.split("\n").map(row => row.split(" "));
};

const test = `set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`;

//assert.equal(duet(parseInput(test)), 4);

const input = `set i 31
set a 1
mul p 17
jgz p p
mul a 2
add i -1
jgz i -2
add a -1
set i 127
set p 735
mul p 8505
mod p a
mul p 129749
add p 12345
mod p a
set b p
mod b 10000
snd b
add i -1
jgz i -9
jgz a 3
rcv b
jgz b -1
set f 0
set i 126
rcv a
rcv b
set p a
mul p -1
add p b
jgz p 4
snd a
set a b
jgz 1 3
snd b
set f 1
add i -1
jgz i -11
snd a
jgz f -16
jgz a -19`;

console.log(duet(parseInput(input)));
