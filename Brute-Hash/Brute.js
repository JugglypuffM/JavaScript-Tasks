module.exports = {brute}

function brute(text, pattern){
    let result = []
    let tLen = text.length
    let pLen = pattern.length
    for(let i = 0; i < tLen-pLen+2; i++){
        let j = 0
        while(text[i+j-1] === pattern[j]){
            j++
            if(j === pLen){
                result.push(i)
                break
            }
        }
    }
    return result
}