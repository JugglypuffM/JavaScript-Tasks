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
        let converted = convert.convert(input)
        fs.writeFileSync(outputFile, converted, "utf-8")
        console.log("Encoding completed!")
        break
    case "calculate":
        let calculated = add.add(input)
        fs.writeFileSync(outputFile, calculated, "utf-8")
        console.log("Calculated!")
        break
}

