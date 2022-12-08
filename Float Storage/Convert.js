module.exports = {convert}

function convert(input){
    let result = ""

    if(input[0] !== "-"){
        result += "0"
    }else{
        result += "1"
        input = input.slice(1)
    }
    if(isNaN(input*1)){
        return result + " 11111111 10000000000000000000000"
    }
    if(input*1 > (2-2**(-23))*2**127) {
        return ("0 11111111 00000000000000000000000").slice(0, 34)
    }else if(input*1 >= 2**(-126)){
        let num = input.split(".")
        let integer = (num[0]*1).toString(2)
        let float
        num[1] ? float = (("0." + num[1])*1).toString(2) : float = ""
        let mantissa = integer + float.slice(2) + "00000000000000000000000"
        let t = 0
        while(mantissa[t] !== "1"){t++}
        mantissa = mantissa.slice(t+1)
        let exponent
        integer === "0" ? exponent = (127-t).toString(2) : exponent = (126 + integer.length).toString(2)
        for(let i = exponent.length; i < 8; i++){
            exponent = "0" + exponent
        }
        result = (result + " " + exponent + " " + mantissa).slice(0, 34)
        return result
    }else if(input*1 >= 2**(-149)){
        let float = (input*1).toString(2)
        let mantissa = float.slice(128) + "00000000000000000000000"
        result = (result + " 00000000 " + mantissa).slice(0, 34)
        return result
    }else if(input*1 === 0){
        return "0 00000000 00000000000000000000000"
    }else{
        return ("1 11111111 00000000000000000000000").slice(0, 34)
    }
}