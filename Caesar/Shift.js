module.exports = {findShift}

function findShift(text){
    let alphabet = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я']
    let canonical = []
    let factional = []
    let diff = Infinity
    let result = 0

    let data = {'а': 8.01, 'б': 1.59, 'в': 4.54, 'г': 1.70, 'д': 2.98, 'е': 8.45, 'ё': 0.04, 'ж': 0.94, 'з': 1.65, 'и': 7.35, 'й': 1.21, 'к': 3.49, 'л': 4.40, 'м': 3.21, 'н': 6.70, 'о': 10.97, 'п': 2.81, 'р': 4.73, 'с': 5.47, 'т': 6.26, 'у': 2.62, 'ф': 0.26, 'х': 0.97, 'ц': 0.48, 'ч': 1.44, 'ш': 0.73, 'щ': 0.36, 'ъ': 0.04, 'ы': 1.90, 'ь': 1.74, 'э': 0.32, 'ю': 0.64, 'я': 2.0}
    canonical = rewrite(data)

    data = []
    for (let i in alphabet) {
        data[alphabet[i]] = 0
    }
    for (let i in text) {
        if (text.charCodeAt(i) > 'я'.charCodeAt(0) || text.charCodeAt(i) < 'А'.charCodeAt(0)) {
            continue
        }
        data[text[i].toLowerCase()]++
    }
    for (let i in data) {
        data[i] = (data[i] / text.length) * 100
    }
    factional = rewrite(data)

    for (let shift = 0; shift < canonical.length; shift++) {
        let sum = 0
        for (let i = 0; i < canonical.length; i++) {
            sum += Math.abs(canonical[i] - factional[(i + shift) % canonical.length])
        }
        if (sum < diff) {
            result = shift
            diff = sum
        }
    }
    if(result>=6) {
        result--
    }
    return result
}

function rewrite(data) {
    let result = []
    for (let i in data) {
        result.push(data[i])
    }
    return result
}