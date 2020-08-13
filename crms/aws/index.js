
module.exports = {
    ...require('./compute'),
    ...require('./network'),
    ...require('./database'),
    ...require('./storage')
}

/*
let func = {
    ...require('./compute'),
    ...require('./network'),
    ...require('./database'),
    ...require('./storage')
}

async function d(){
    const AWS = require('aws-sdk')
    let key = {"accessKeyId":"AKIATOLCGVDHV56GC2C4","secretAccessKey":"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","region":"ap-northeast-2"}
    AWS.config.update(key)
    let a = await func.describeSubnets(key)
    console.log(a)
}

d()
*/