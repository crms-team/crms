const crms = require('../../crms')
const key = require('./key')

function scanning(path) { 
    let keys = key.getKeyData(path)
    for (let id in keys) {
        crms.data.saveData(path, id, keys[id].vendor, keys[id].keys)
    }0
}

async function logger(path) {
    scanning(path)
    setInterval(()=>{
        scanning(path)
    }, 1000 * 60)
}

module.exports = {
    logger: logger      
}