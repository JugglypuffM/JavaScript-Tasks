module.exports = {node, letterFreq, timeToStop, linkIndex, inTable, getRandomInt}

function node(letter, freq, link, code, used){
    this.letter = letter
    this.freq = freq
    this.link = link
    this.code = code
    this.used = used
}

function letterFreq(string){
    let alphabet = []
    let result = []
    for(let index = 0; index < string.length; index++)
    {
        if (alphabet[string.charAt(index)])
            alphabet[string.charAt(index)]++
        else {
            alphabet[string.charAt(index)] = 1
        }
    }
    for(let i in alphabet){
        result.push([i, alphabet[i]])
    }
    return result
}

function timeToStop(nodes){
    let amount = 0
    let result
    for(let i = 0; i < nodes.length; i++){
        (nodes[i].used === 0) ? amount++ : 0;
    }
    (amount === 1) ? result = true : result = false
    return result
}

function linkIndex(nodes, link){
    let result = 0
    for(let i = 0; i < nodes.length; i++){
        (nodes[i].letter === link) ? result = i : 0;
    }
    return result
}

function inTable(exp, table){
    let result = false
    for(let i in table){
        (table[i] === exp) ? result = i : 0
    }
    return result
}

function getRandomInt(min, max){
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}