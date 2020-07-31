// init crms
const system = require('./system')
const path = require('path')

const PATH = __dirname.split(path.sep).slice(0, -1).join(path.sep)

if (!system.config.existConfig(PATH)){
    if (!system.config.createConfig(PATH)){
        console.log("Failed Create Config File path ./crms/data/crms.config")
        process.exit()
    }
}

// create express server
const express = require('express')
const server = express()
const cors = require('cors');

// add server.config
server.config = system.config.getConfig(PATH)    
const PORT = server.config.server_port

server.use(cors())
require('./api')(server)
server.listen(PORT, ()=>{
    console.log('>> Statr Node Server 0.0.0.0:' + PORT)
})
