const fs = require('fs');

if (process.argv.length < 5) {
    console.error("Super file shrinker v1.0.0");
    console.error("    node shrinker.js shrink <input-file> <output-file>");
    console.error("    node shrinker.js unshrink <input-file> <output-file>");
    process.exit(1);
}

let mode = process.argv[2];
let inputFile = process.argv[3];
let outputFile = process.argv[4];

let inputBytes = Array.prototype.slice.call(fs.readFileSync(inputFile));
let outputBytes;

if (mode === 'shrink') outputBytes = shrink(inputBytes);
else if (mode === 'unshrink') outputBytes = unshrink(inputBytes);
else throw("Unknown mode: " + mode);

fs.writeFileSync(outputFile, new Buffer(outputBytes));

////////// Your code: //////////
function getDelta(a) {
  let delta = []
  for (i = 1; i<= a.length; i++) {
    delta.push(a[i] - a[i - 1]);
  }
  return delta;
}

function shrink(input) {
    let output = [];

    // delta encoding goes here
    let deltaInput = getDelta(input);

    // EDIT ME
    while (input.length > 0) {
      if (input.length > 2 && input[0] == input[1]) {
        let count = 1;
        for (let i=1; i<input.length && input[i] === input[0]; i++) {
          count++;
        }
        output.push(count);
        output.push(input[0]);
        input = input.slice(count);

      } else {
        output.push(1);
        output.push(input[0]);
        input = input.slice(1);

      }

    }

    return output;
}

function unshrink(input) {
    let output = [];

    // EDIT ME
    while (input.length > 0) {
      for (let i=0; i<input[0]; i++) {
        output.push(input[1]);
      }

      input = input.slice(2);
    }

    return output;
}
