let calculator = require("./Calculator")
let arg = process.argv;
let input = arg[2].toString();

let result = calculator.notate(input)

console.log("Notation: ", result);

