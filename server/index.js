// init crms
const system = require('./system')
const path = require('path')

const PATH = __dirname.split(path.sep).slice(0, -1).join(path.sep)

if (!system.config.existConfig(PATH)){
    if (!system.config.createConfig(PATH)){
        console.log("Failed Create Config File path ./data/crms.config")
        process.exit()
    }
}

if (!system.key.existsKeyData(PATH)) {
    if (!system.key.createKeyData(PATH)){
        console.log("Failed Create Key Data File path ./data/key_data.json")
        process.exit()
    }
}

// create express server
const express = require('express')
const bodyParser = require('body-parser')
const server = express()
const cors = require('cors');

// add server.config
server.config = system.config.getConfig(PATH)   
const PORT = server.config.server_port


server.keys = require('./system/key')

//// TEST

const dataMod = require('../crms/data')
console.log("testing start")
//dataMod.saveData(server.config.path, 'taws', 'aws', {"accessKeyId":"AKIATOLCGVDHV56GC2C4","secretAccessKey":"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","region":"ap-northeast-2"})
console.log("testing stop")

////


server.use(cors())
server.use(bodyParser.json())
require('./api')(server)
server.listen(PORT, ()=>{
    console.log('>> Statr Node Server 0.0.0.0:' + PORT)
})
