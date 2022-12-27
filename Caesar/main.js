let fs = require("fs")
let coding = require("./Coding")
let find = require("./Shift")
let arg = process.argv

let mode = arg[2]
let inputFile = arg[3]
let outputFile = arg[4]
let shift = arg[5]*1
let input = fs.readFileSync(inputFile, "utf-8")
let result

switch (mode) {
    case "encode":
        result = coding.encode(input, shift)
        fs.writeFileSync(outputFile, result, "utf-8")
        console.log("Encoding completed!")
        break
    case "decode":
        shift = find.findShift(input)
        console.log(shift)
        result = coding.decode(input, shift)
        fs.writeFileSync(outputFile, result, "utf-8")
        console.log("Decoding completed!")
        break
}
