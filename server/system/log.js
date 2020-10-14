const crms = require('../../crms')
const { getKeyData } = require('./key')
const key = require('./key')

function scanning(path) { 
    let keys = key.getKeyData(path)
    for (let id in keys) {
        crms.data.saveData(path, id, keys[id].vendor, keys[id].keys)
    }
}


function getSession(resourceType) {
    switch (resourceType) {
        case 'server': {
            return 'compute'
        }
        case 'database': {
            return 'database'
        }
    }
}

function scheduler(path) {
    let schedulerData = []
    let keyData = getKeyData(path)
    try {
        schedulerData = JSON.parse(fs.readFileSync(PATH.normalize(`${path}/data/scheduler.json`)))
    } catch {}

    let now = new Date()
    let nowTime = now.getHours() * 60 + now.getMinutes()

    for (let element of schedulerData) {
        let keyId = element.keyId
        let session = element.session
        let type = element.type ? 'start' : 'stop'
        let args = element.args
        let vendor = keyData[keyId].vendor

        let time = element.hour * 60 + element.min
        if (nowTime -5 <= time && time <= nowTime) {
            crms[vendor].session[getSession(session)][session].etc[type](keyData[keyId].keys, args)
        }
    }


}

async function logger(path) {
    scanning(path)
    scheduler(path)

    setInterval(()=>{
        scanning(path)
    }, 1000 * 60 * 60)

    setInterval(()=>{
        scheduler(path)
    }, 1000 * 60 * 5)
}

module.exports = {
    logger: logger      
}