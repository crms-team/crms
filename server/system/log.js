const crms = require('../../crms')
const key = require('./key')

async function logger(path) {
    setInterval(()=>{
        let keys = key.getKeyData(path)
        for (let id in keys) {
            crms.data.saveData(path, id, keys[id].vendor, keys[id].keys)
        }
    }, 1000 * 60)
}

module.exports = {
    logger: logger      
}