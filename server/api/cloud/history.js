const fs = require('fs')
const PATH = require('path')

function getHistory(path, keyId) {
    let historyPath = PATH.normalize(`${path}/data/${keyId}/history.json`)
    return JSON.parse(fs.readFileSync(historyPath))
}


module.exports = server => {
    {
        server.get('/api/cloud/history', async (req, res) => {
            let keyId = req.query.key_id

            let keys = server.keys.getKeyData(server.config.path)

            if (keyId == undefined) {
                let result = []
                
                for (let key in keys) {
                    result = result.concat(getHistory(server.config.path, key))
                }

                res.send({
                    result: true,
                    history: result
                })
            } else if (keyId in keys) {
                res.send({
                    result: true,
                    history: getHistory(server.config.path, keyId)
                })
            } else {
                res.send({
                    result: false,
                    msg: 'This Key ID is not registered.'
                })
            }
        })
    }
}