
//module.exports = 
let func = {
    ...require('./compute'),
    ...require('./network'),
    ...require('./database'),
    ...require('./storage')
}

async function d(){
    let key = {"accessKeyId":"AKIATOLCGVDHV56GC2C4","secretAccessKey":"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","region":"ap-northeast-2"}
    let a = await func.describeSecurityGroups(key)
    console.log(Object.keys(func))
}

d()
