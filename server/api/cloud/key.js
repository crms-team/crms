const key_module = require('../../system').key
const fs = require('fs')
const PATH = require('path')
const crms = require('../../../crms')

function isKeyFormat(vendor, keys){
    switch (vendor) {
        case 'aws': {
            let keyList = Object.keys(keys)
            let existAccessKey = keyList.indexOf('accessKeyId') > -1
            let existSecretKey = keyList.indexOf('secretAccessKey') > -1
            let existRegion = keyList.indexOf('region') > -1
            return existAccessKey && existSecretKey && existRegion
        } 
        default:
            break;
    }
    return false;
}

function setKeyFunc(path, key_id, vendor, keys) {
    let data = key_module.getKeyData(path)
    if (!isKeyFormat(vendor, keys)){
        return {result: false, msg: 'Key Format Error'}
    }

    data[key_id] = {
        vendor: vendor,
        keys: keys
    }

    if (!key_module.setKeyData(path, data)){
        return {result: false, msg: 'Set Key Error'}
    }

    fs.mkdirSync(PATH.normalize(`${path}/data/${key_id}/log`), {recursive: true})
    fs.writeFileSync(PATH.normalize(`${path}/data/history.json`), '[]')
    return {result: true}
}

module.exports = server => {
    // /api/cloud/key: cloud key api
    {
        server.get('/api/cloud/key', (req, res) => {
            let key_id = req.query.key_id
            let data = key_module.getKeyData(server.config.path)
            res.send({result: data[key_id] != undefined, data: data[key_id]})
        })
        
        server.post('/api/cloud/key', (req, res) => {
            let data = key_module.getKeyData(server.config.path)
            let key_id = req.body.key_id

            if (key_id in data){
                res.send({result: false, msg: 'Exist Key ID'})
                return 
            } 

            let vendor = req.body.vendor
            let keys = req.body.keys

            res.send(setKeyFunc(server.config.path, key_id, vendor, keys))
            crms.data.saveData(server.config.path, key_id, vendor, keys)
        })
        
        server.put('/api/cloud/key', (req, res) => {
            let key_id = req.body.key_id
            let data = key_module.getKeyData(server.config.path)

            if (!(key_id in data)){
                res.send({result: false, msg: 'Not Exists KEY id'})
                return
            }
            
            let vendor = req.body.vendor
            let keys = req.body.keys
            res.send(setKeyFunc(server.config.path, vendor, keys))
        })

        server.delete('/api/cloud/key', (req, res) => {
            let key_id = req.query.key_id
            let data = key_module.getKeyData(server.config.path)

            if (!(key_id in data)){
                res.send({result: false, msg: 'Not Exists KEY id'})
                return
            }

            delete data[key_id]

            if (!setKeyData(server.config.path, data)) {
                res.send({result: false, msg: 'Set Data Error'})
                return
            }

            res.send({result: true})
        })
    }

    
    // /api/cloud/key/list: cloud key list api
    {
        server.get('/api/cloud/key/list', (req, res) => {
            let key_data = key_module.getKeyData(server.config.path)
            let keys = []

            if (req.query.options) {
                let options = Array.from(req.query.options)
                for (let key in key_data) {
                    let data = {}
                    for (let option of options){
                        data[option] = key_data[key][option]
                    }
                    keys.push(data)
                }    
            } else {
                keys = key_data
            }
            
            res.send({result: true, keys: keys})
        })
        
        server.post('/api/cloud/key/list', (req, res) => {
            res.send({result: false, msg: 'API Not support'})
        })
        
        server.put('/api/cloud/key/list', (req, res) => {
            res.send({result: false, msg: 'API Not support'})
        })

        server.delete('/api/cloud/key/list', (req, res) => {
            res.send({result: false, msg: 'API Not support'})
        })
    }
}