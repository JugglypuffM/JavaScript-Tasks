let fs = require("fs")
let convert = require("./Convert")
let add = require("./Calculate")
let arg = process.argv

let mode = arg[2]
let inputFile = arg[3]
let outputFile = arg[4]
let input = fs.readFileSync(inputFile, "utf-8")

switch (mode) {
    case "convert":
        let converted = convert.toBin(input)
        fs.writeFileSync(outputFile, converted, "utf-8")
        console.log("Encoding completed!")
        break
    case "calculate":
        let calculated = add.calculate(input)
        let dec = convert.fromBin(calculated)
        fs.writeFileSync(outputFile, calculated + " ~ " + dec.toString(), "utf-8")
        console.log("Calculated!")
        break
}

