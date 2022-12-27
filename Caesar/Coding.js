module.exports = {encode, decode}

function encode(text, shift){
    let result = ''
    for (let i = 0; i < text.length; i++) {
        if (text.charCodeAt(i) > 'я'.charCodeAt(0) || text.charCodeAt(i) < 'А'.charCodeAt(0)) {
            result += text[i]
            continue
        }
        let code = text.charCodeAt(i) + shift
        while (code > 'я'.charCodeAt(0)) {
            code = code - 'я'.charCodeAt(0) + 'А'.charCodeAt(0) - 1
        }

        result += String.fromCharCode(code)
    }
    return result
}
function decode(text, shift) {
    let result = ''
    for (let i = 0; i < text.length; i++) {
        if (text.charCodeAt(i) > 'я'.charCodeAt(0) || text.charCodeAt(i) < 'А'.charCodeAt(0)) {
            result += text[i]
            continue
        }
        let code = text.charCodeAt(i) - shift
        while (code < 'А'.charCodeAt(0)) {
            code = code + 'я'.charCodeAt(0) - 'А'.charCodeAt(0) + 1
        }
        result += String.fromCharCode(code)
    }
    return result
}