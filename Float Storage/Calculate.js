module.exports = {add: calculate}
let p = require("./Convert")

function calculate(input){
    input = input.split(" ")
    let a = input[0]
    let b = input[2]
    let denormalized;
    let exponent = ""
    let mantissa = ""
    let temp = 0
    let niggative = false
    if(a*1 < b*1){
        let z = a
        a = b
        b = z
        niggative = true
    }
    if(a*1 === b*1){
        return "0 00000000 00000000000000000000000"
    }
    if(b*1 === 0){
        if(niggative){
            return p.convert("-" + a)
        }else{
            return p.convert(a)
        }
    }
    a = p.convert(a).split(" ")
    b = p.convert(b).split(" ")
    if((a[1] === b[1]) && (a[1] === "00000000")){
        denormalized = true
    }
    if(!denormalized){
        a[2] = "1" + a[2]
        b[2] = "1" + b[2]
    }
    if(a[1] !== b[1]){
        let d = parseInt(a[1], 2) - parseInt(b[1], 2)
        for(let i = 0; i < d; i++) {
            b[2] = "0" + b[2].slice(0, b[2].length - 1)
        }
    }
    switch (input[1]){
        case "+":
            for(let i = a[2].length-1; i >= 0; i--){
                let f = a[2][i]*1 + b[2][i]*1 + temp
                mantissa = (f%2).toString() + mantissa
                temp = Math.floor(f/2)
            }
            exponent = (parseInt(a[1], 2)+temp).toString(2)
            for(let i = exponent.length; i < 8; i++){
                exponent = "0" + exponent
            }
            (temp !== 1) ? temp = "" : temp
            if(denormalized){
                mantissa = (temp.toString() + mantissa)
                return ("0 00000000 " + mantissa).slice(0, 34)
            }else {
                mantissa = (temp.toString() + mantissa).slice(1)
                return ("0 " + exponent + " " + mantissa).slice(0, 34)
            }
        case "-":
            for(let i = a[2].length-1; i >= 0; i--){
                let current = a[2][i]*1 - b[2][i]*1 - temp
                if(current < 0){
                    temp = 1
                    mantissa = (2+current).toString() + mantissa
                }else{
                    temp = 0
                    mantissa = current.toString() + mantissa
                }
            }
            let step = mantissa.indexOf("1")
            exponent = (parseInt(a[1], 2)-step).toString(2)
            for(let i = exponent.length; i < 8; i++){
                exponent = "0" + exponent
            }
            if(denormalized){
                mantissa = mantissa + "00000000000000000000000"
                return ((niggative*1).toString() + " 00000000 " + mantissa).slice(0, 34)
            }
    }
    return ""
}