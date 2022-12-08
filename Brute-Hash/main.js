let fs = require("fs")
let b = require("./Brute")
let h = require("./Hash")
let c = require("./Comparsion")
let arg = process.argv

let mode = arg[2]
let pattern = arg[3]
let inputFile = arg[4]
let outputFile = arg[5]
let aether = arg[6]
let input = fs.readFileSync(inputFile, "utf-8")
let array = []
let result = ""

switch (mode){
    case "brute":
        array = b.brute(input, pattern)
        result = ""
        for(let i in array){
            result += array[i] + " "
        }
        fs.writeFileSync(outputFile, result, "utf-8")
        break
    case "hash":
        array = h.hash(input, pattern)
        result = ""
        for(let i in array){
            result += array[i] + " "
        }
        fs.writeFileSync(outputFile, result, "utf-8")
        break
    case "compare":
        array[0] = c.time(b.brute, input, pattern, aether)
        array[1] = c.time(h.hash, input, pattern, aether)
        result += "Время поиска Brute-Force = " + array[0] + "\n"
        result += "Время поиска Hash = " + array[1] +"\n"
        result += "Отношение времени выполнения Hash к Brute-Force = " + array[1]/array[0]
        fs.writeFileSync(outputFile, result, "utf-8")
        break
}