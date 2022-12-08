module.exports = {hash}

function isMatched(substring, pattern){
    for(let i = 0; i < pattern.length;i++){
        if(pattern[i] !== substring[i]){return false}
    }
    return true
}

function hash(text, pattern) {
    let result = []
    let n = text.length
    let m = pattern.length
    let pHash = 0
    let sHash = 0
    for (let i = 0; i < m; i++) {
        pHash += pattern.charCodeAt(i)
        sHash += text.charCodeAt(i)
    }
    for (let i = 0; i <= n - m; i++) {
        if(pHash === sHash)
            if(isMatched(text.substring(i, i+m), pattern))
                result.push(i+1)
        sHash -= text.charCodeAt(i)
        sHash += text.charCodeAt(i+m)
    }
    return result
}