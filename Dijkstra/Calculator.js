module.exports = {notate}

function notate(expression) {
    let stack = []
    let notation = ''
    let number = ''

    let priority = {'+': 1, '-': 1, '*': 2, '/': 2, 's': 3}

    function findBracket(i) {
        let c = 0
        for (let j = i + 1; j < expression.length; j++) {
            if (expression[j] === ')' && c === 0) {
                return j
            }
            if (expression[j] === '(')
                c++
            if (expression[j] === ')')
                c--
        }
    }

    for (let i = 0; i < expression.length; i++) {
        if (isNaN(expression[i]) && priority[expression[i]] === undefined && expression[i] !== '(' && expression[i] !== ')') {
            return "Unexpected expression - " + expression[i]
        }
        if (!isNaN(expression[i])) {
            number += expression[i]
        } else {
            if (number.length !== 0) {
                notation += number
                number = ''
            }
            if (expression[i] === '(') {
                let closeBracket = findBracket(i)
                notation += notate(expression.substring(i + 1, closeBracket))
                i = closeBracket
                continue;
            }
            if (stack.length === 0) {
                stack.push(expression[i])
                continue
            }
            if (expression[i] === 's') {
                stack.push(expression[i])
                continue;
            }
            if (priority[expression[i]] <= priority[stack[stack.length - 1]]) {
                while (priority[expression[i]] <= priority[stack[stack.length - 1]]) {
                    notation += stack[stack.length - 1]
                    stack.pop()
                }
                stack.push(expression[i])
            }else{
                stack.push(expression[i])
            }
        }
    }
    if(number.length !== 0) {
        notation += number
    }
    for (let i = stack.length - 1; i >= 0; i--) {
        notation += stack[i]
    }
    return notation
}
