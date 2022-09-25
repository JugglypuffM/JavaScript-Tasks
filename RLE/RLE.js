let fs = require("fs")
let arg = process.argv

let mode = arg[2]
let inputFile = arg[3]
let outputFile = arg[4]

let inputText = fs.readFileSync(inputFile, "utf-8")

function asciiTable(){
    let table = []
    for(let index = 0; index < 256; index++){
        table[index] = String.fromCharCode(index)
    }
    return table
}

function encode(string){
    let amount = 0
    let result = ""
    for(let index = 0; index < string.length; index++){
        if (string[index] === string[index + 1])
            amount++
        else {
            let repeats = Math.trunc(amount/255)
            for(let jindex = 0; jindex < repeats; jindex++){
                result = result +  "#" + asciiTable()[255] + string[index]
            }
            result += "#" + asciiTable()[amount-255*repeats + 1] + string[index]
            amount = 0
        }
    }
    fs.writeFileSync(outputFile, result)
    return result
}

function decode(string){
    let result = ""
    for(let index = 0; index < string.length; index += 3){
        let amount = asciiTable().indexOf(string[index+1])
        let part = ""
        for(let jindex = 0; jindex < amount; jindex++){
            part += string[index+2]
        }
        result += part
    }
    fs.writeFileSync(outputFile, result)
    return result
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

function test(amount){
    let alphabet = "abcjkrlotpfnmsq!$#@&^()+?<>}:AHBVCERLK1234567890-=".split("")
    for(let i = 0; i < amount; i++){
        let word = ""
        while(getRandomInt(0, 4) !== 3){
            let part = ""
            let char = alphabet[getRandomInt(0, alphabet.length)]
            for(let jindex = 0; jindex < getRandomInt(0, 100000000); jindex++){
                part += char
            }
            word += part
        }
        let encoded = encode(word)
        let decoded = decode(encoded)
        if(decoded !== word){
            console.log(word)
            console.log(" ")
            console.log(encoded)
            console.log(" ")
            console.log(decoded)
            return 0
        }
    }
    console.log("You're brilliant!")
}

if (mode === "encode") {
    encode(inputText);
} else if (mode === "decode") {
    decode(inputText);
} else if (mode === "test") {
    test(1000)
    console.log("Tested on 1000 random strings")
}
