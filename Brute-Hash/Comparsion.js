module.exports = {time}

function time(f, text, pattern, iterations){
    let start = (new Date()).getTime()
    for(let i = 0; i < iterations; i++){
        f(text, pattern)
    }
    let end = (new Date()).getTime()
    return (end-start)/iterations
}