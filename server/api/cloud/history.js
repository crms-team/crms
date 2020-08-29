const fs = require('fs')
const PATH = require('path')

function getHistoryStatus(history) {
    let statusCount = { remove: 0, create: 0, modify: 0}
    let check = false
    
    for (let session in history){
        for (let type in history[session]) {
            for (let status in history[session][type]) {
                statusCount[status] += 1
                check = statusCount.remove != 0 && statusCount.create != 0 && statusCount.modify != 0 

                if (check) {
                    return 'Transform'
                }
            }
        }
    }

    let count = 0
    let status = undefined

    for (let idx in statusCount) {
        if (statusCount[idx] > 0) {
            count ++
            status = idx
        }
    }

    if (count == 1) return status[0].toUpperCase() + status.slice(1)
    else return 'Transform'
}

function setHistoryTitle(history) {
    let status = getHistoryStatus(history)
    let resource

    let sessions = Object.keys(history)

    if (sessions.length == 1) {
        let resourceTypes = Object.keys(history[sessions[0]])

        if (resourceTypes == 1) {
            resource = resourceTypes.join(', ')
        } else {
            resource = sessions[0]
        }
    } else {
        resource = sessions.length != 4 ? sessions.join(', ') : 'all'
    }

    return `${status} ${resource}`
}


function getHistory(path, keyId) {
    let historyPath = PATH.normalize(`${path}/data/${keyId}/history.json`)
    let historys = JSON.parse(fs.readFileSync(historyPath))

    for (let i = 0; i < historys.length; i++) {
        historys[i].keyId = keyId
        historys[i].title = setHistoryTitle(historys[i].detail)
    }

    return historys
}

function changeHisotry(historys, count) {
    historys.sort((a, b)=> {
        if (a.time < b.time) return 1
        else if (a.time > b.time) return -1
        return 0
    })

    if (count != undefined) {
        historys = historys.slice(0, count)
    } 

    return historys
}


module.exports = server => {
    {
        server.get('/api/cloud/history', async (req, res) => {
            let keyId = req.query.key_id
            let count = req.query.count
            let keys = server.keys.getKeyData(server.config.path)

            if (keyId == undefined) {
                let historys = []
                
                for (let key in keys) {
                    historys = historys.concat(getHistory(server.config.path, key))
                }

                res.send({
                    result: true,
                    history: changeHisotry(historys, count)
                })
            } else if (keyId in keys) {
                let historys = getHistory(server.config.path, keyId)

                res.send({
                    result: true,
                    history: changeHisotry(historys, count)
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