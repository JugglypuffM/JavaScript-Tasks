let fs = require("fs")
let huff = require("./Huffman")

let arg = process.argv

if(arg[2] === "test"){
    huff.test(arg[3])
}
else{
    let inputFile = arg[2]
    let tableFile = arg[3]
    let encodedFile = arg[4]
    let decodedFile = arg[5]

    let input = fs.readFileSync(inputFile, "utf-8")
    let tree = huff.buildTree(input)
    let table = huff.buildTable(tree)
    let encoded = huff.encode(input, table)
    let decoded = huff.decode(encoded, table)

    fs.unlinkSync(tableFile)
    for(let i in table){
        fs.writeFileSync(tableFile, i + ":" + table[i] + "\n", {flag: "as"})
    }
    fs.writeFileSync(encodedFile, encoded)
    fs.writeFileSync(decodedFile, decoded)

}
