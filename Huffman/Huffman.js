module.exports = {buildTree, buildTable, encode, decode, test}
const func = require("./Functions");

function buildTree(message){
    let alphabet = func.letterFreq(message)
    let nodes = []
    for (let i = 0; i < alphabet.length; i++) {
        a = new func.node(alphabet[i][0], alphabet[i][1], "", "", 0)
        nodes.push(a)
    }
    for (let i = 0; i < nodes.length; i += 2) {
        if (func.timeToStop(nodes)) {
            break
        }
        nodes = nodes.sort((a, b) => a.freq - b.freq)
        let node = new func.node(nodes[i].letter + nodes[i + 1].letter, nodes[i].freq + nodes[i + 1].freq, "", "", 0)
        nodes[i].link = node.letter
        nodes[i].used = 1
        nodes[i + 1].link = node.letter
        nodes[i + 1].used = 1
        nodes.push(node)
    }
    nodes = nodes.sort((a, b) => b.letter.length - a.letter.length)
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].used = 0
    }
    for (let i = 1; i < nodes.length; i++) {
        if (nodes[func.linkIndex(nodes, nodes[i].link)].used === 0) {
            nodes[i].code += nodes[func.linkIndex(nodes, nodes[i].link)].code + "1"
            nodes[func.linkIndex(nodes, nodes[i].link)].used = 1
        } else {
            nodes[i].code += nodes[func.linkIndex(nodes, nodes[i].link)].code + "0"
        }
    }
    (nodes.length === 1) ? nodes[0].code = "0" : 0
    return nodes
}

function buildTable(tree){
    let table = []
    for(let i = 0; i < tree.length; i++){
        if(tree[i].used === 0){
            table[tree[i].letter] = tree[i].code
        }
    }
    return table
}

function encode(message, table){
    let result = ""
    for(let i = 0; i < message.length; i++){
        result += table[message[i]]
    }
    return result
}

function decode(message, table){
    let temp = ""
    let result = ""
    for(let i = 0; i < message.length; i++){
        temp += message[i]
        if(func.inTable(temp, table) !== false){
            result += func.inTable(temp, table)
            temp = ""
        }
    }

    return result
}

function test(amount){
    let alphabet = "abcjkrlotpfnmsq!$#@&^()+?<>}:AHBVCERLK1234567890-=".split("")
    for(let i = 0; i < amount; i++){
        let word = ""
        while(func.getRandomInt(0, 4) !== 3){
            let part = ""
            let char = alphabet[func.getRandomInt(0, alphabet.length)]
            for(let index = 0; index < func.getRandomInt(0, 100000000); index++){
                part += char
            }
            word += part
        }
        let tree = buildTree(word)
        let table = buildTable(tree)
        let encoded = encode(word, table)
        let decoded = decode(encoded, table)
        if(decoded !== word){
            console.log(word)
            console.log(" ")
            console.log(tree)
            console.log(" ")
            console.log(table)
            console.log(" ")
            console.log(encoded)
            console.log(" ")
            console.log(decoded)
            return 0
        }
    }
    console.log("You're brilliant!")
}
