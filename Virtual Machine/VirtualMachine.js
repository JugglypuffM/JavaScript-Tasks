//Introducing to You : The SKript, S(tas) K(linin)..... idk what does ript stand for.....

const fs = require("fs")
const rl = require('readline-sync')
const arg = process.argv

let programmFile = arg[2]
let programmText = fs.readFileSync(programmFile, "utf-8")

for(let i = 0; i < programmText.length; i++){
    (programmText[i] === "\n") ? programmText = programmText.replace("\n", "").replace("\r", " ") : 0
}

let memory = programmText.split(" ")
let base = memory.length
let ip = 0
let boolRegister = ""

function doIndex(arr, exp, ip){
    let result
    for(let i = 0; i < arr.length; i++){
        (arr[i] === exp)&&(i !== ip+1)&&(i !== ip+2) ? result = i : 0
    }
    return result
}

while(true){
    switch (memory[ip]){
        case "catch":
            let number = rl.question("Give me some number):\n")
            memory[memory[ip+1]*1 + base] = number*1
            ip += 1
            break
        case "plus":
            memory[memory[ip+3]*1 + base] = memory[memory[ip+1]*1 + base] + memory[memory[ip+2]*1 + base]
            ip += 3
            break
        case "throw":
            console.log(memory[memory[ip+1]*1 + base])
            ip += 1
            break
        case "place":
            (memory[memory[ip+1]*1 + base] > memory[memory[ip+2]*1 + base]) ? boolRegister = 1 : boolRegister = 0
            ip += 2
            break
        case "walk":
            if(boolRegister !== ""){
                (boolRegister === 1) ? ip = doIndex(memory, memory[ip+1], ip): ip = doIndex(memory, memory[ip+2], ip)
            }
            else{
                console.log("ERR : Bool register is empty...")
                memory[ip+1] = "exit"
            }
            break
        case "star":
            memory[memory[ip+3]*1 + base] = memory[memory[ip+1]*1 + base] * memory[memory[ip+2]*1 + base]
            ip += 3
            break
        case "create":
            memory[memory[ip+1]*1 + base] = memory[ip+2]*1
            ip += 2
            break
        case "slash":
            memory[memory[ip+3]*1 + base] = memory[memory[ip+1]*1 + base] % memory[memory[ip+2]*1 + base]
            ip += 3
            break
    }
    ip += 1
    if(ip > memory.length){
        break
    }
}