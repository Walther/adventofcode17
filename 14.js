const assert = require("assert");

// Shamelessly copy-pasted from 10.js
// Optimize later, maybe as an import or something
const rotate = (array, n) => {
  return array.slice(n, array.length).concat(array.slice(0, n));
};
const knotHash = string => {
  let size = 256;
  let array = Array.from(Array(size).keys()); // range 0..size-1
  // Convert string to array of bytes
  let input = string.split("").map(char => char.charCodeAt());
  // Append magical sprinkles
  input = input.concat([17, 31, 73, 47, 23]);
  let position = 0;
  let skipSize = 0;
  for (let round = 0; round < 64; round++) {
    input.forEach(length => {
      // Rotate list so that starting point is at zero
      array = rotate(array, position);
      // Splice the list to reversepart + rest
      let part1 = array.slice(0, length).reverse();
      let part2 = array.slice(length, size);
      // Put the array back together
      array = part1.concat(part2);
      // Rotate list back to original rotation state
      array = rotate(array, size - position);
      // Increase position by length plus iteration count
      position = (position + length + skipSize) % size;
      // Increase skipSize
      skipSize++;
    });
  }
  // Split array to chunks, 16 * 16
  let chunk = 16;
  let chunks = [];
  for (let part = 0; part < array.length; part += chunk) {
    chunks.push(array.slice(part, part + chunk));
  }
  // Compute the dense hash from the sparse one
  array = chunks.map(chunk => chunk.reduce((a, b) => a ^ b));
  // Return the hash
  let str = array
    .map(number => {
      let hex = number.toString(16);
      // Left-pad if necessary
      if (hex.length === 1) {
        hex = "0" + hex;
      }
      return hex;
    })
    .join("");
  return str;
};

assert.equal(knotHash("AoC 2017"), "33efeb34ea91902bb2f59c9920caa6cd");

const dfs = (input, x, y, visited) => {
  if (
    x < 0 ||
    y < 0 ||
    x > input[0].length - 1 ||
    y > input.length - 1 ||
    visited[x][y] === 1 ||
    input[x][y] === 0
  ) {
    try {
      visited[x][y] = 1;
    } catch (e) {}
    return visited;
  } else {
    visited[x][y] = 1;
    visited = dfs(input, x, y - 1, visited); //north
    visited = dfs(input, x + 1, y, visited); //east
    visited = dfs(input, x, y + 1, visited); //south
    visited = dfs(input, x - 1, y, visited); //west
    return visited;
  }
};

const countRegions = input => {
  let islands = 0;
  let visited = input.map(row => new Array(input.length).fill(0));
  for (let x = 0; x < input[0].length; x++) {
    for (let y = 0; y < input.length; y++) {
      if (input[x][y] === 1 && visited[x][y] === 0) {
        visited = dfs(input, x, y, visited);
        islands++;
      } else {
        visited[x][y] = 1;
      }
    }
  }
  return islands;
};

const defragment = input => {
  let rows = [];
  for (let i = 0; i < 128; i++) {
    rows.push(input + "-" + i);
  }
  let hashes = rows.map(knotHash);
  let usedBits = hashes.map(row =>
    row
      .split("")
      .map(byte =>
        parseInt(byte, 16)
          .toString(2)
          .padStart(4, "0000")
      )
      .join("")
      .split("")
      .map(Number)
  );
  let sum = [].concat
    .apply([], usedBits) // flatten
    .reduce((a, b) => a + b); // sum
  let regions;
  regions = countRegions(usedBits);
  return [sum, regions];
};

assert.deepEqual(defragment("flqrgnkx"), [8108, 1242]);
console.log(defragment("hfdlxzhv"));
