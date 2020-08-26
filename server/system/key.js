const fs = require('fs')
const PATH = require('path')

module.exports = {
    createKeyData: function(path) {
        fs.mkdir(PATH.normalize(`${path}/data`), {recursive: true}, () => {})
        return this.setKeyData(path, {})
    },
    getKeyData: function(path) {
        try {
            return JSON.parse(fs.readFileSync(PATH.normalize(`${path}/data/key_data.json`)))
        } catch {
            console.log('getKeyData function Error')
            return false
        }
    },
    setKeyData: function(path, data) {
        try {
            fs.writeFileSync(PATH.normalize(`${path}/data/key_data.json`), JSON.stringify(data))
            return true
        } catch {
            console.log('setKeyData function Error')
            return false
        }
    },
    existsKeyData: function(path) {
        try {
            fs.statSync(PATH.normalize(`${path}/data/key_data.json`))
            return true
        } catch {
            return false
        }
    }
}