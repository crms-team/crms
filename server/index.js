// init crms
const system = require('./system')
const path = require('path')
const fs = require('fs')

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
const { Router } = require('react-router-dom')

// add server.config
server.config = system.config.getConfig(PATH)   
const PORT = server.config.server_port
server.keys = require('./system').key

// logging
//system.log.logger(server.config.path)

server.use(cors())
server.use(bodyParser.json())
require('./api')(server)
server.listen(PORT, ()=>{
    console.log('>> Start Node Server 0.0.0.0:' + PORT)
})

// using build react 
if (fs.existsSync(__dirname + '/../build')){
    server.use(express.static(path.join(__dirname, '../build')))
    const router = express.Router()

    router.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../build/index.html'))
    })

    server.use(router)
}
