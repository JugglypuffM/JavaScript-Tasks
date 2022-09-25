let fs = require("fs");
let arg = process.argv;

let inputTxt = fs.readFileSync(arg[2], "utf-8");

let alph = []
let n = 0
let chars = ""
let h = 0
let p = 0

for(let index = 0; index < inputTxt.length; index++)
{
    if (alph[inputTxt.charAt(index)])
        alph[inputTxt.charAt(index)]++
    else {
        n++
        chars += inputTxt.charAt(index)
        alph[inputTxt.charAt(index)] = 1
    }
}

if (n !== 1)
    for (let index = 0; index < n; index++)
    {
        p = alph[chars.charAt(index)]/inputTxt.length
        h -= p * (Math.log(p)/Math.log(n))
    }
fs.writeFileSync("output.txt", h.toString())
