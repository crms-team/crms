const fs = require('fs')

module.exports = {
    createKeyData: function (path) {
        fs.mkdir(`${path}/data`, ()=>{})
        return this.setKeyData(path, {})
    },
    getKeyData: function (path) {
        try {
            return JSON.parse(fs.readFileSync(`${path}/data/key_data.json`))
        } catch {
            console.log('getKeyData function Error')
            return false
        }
    },
    setKeyData: function (path, data) {
        try {
            fs.writeFileSync(`${path}/data/key_data.json`, JSON.stringify(data))
            return true
        } catch {
            console.log('setKeyData function Error')
            return false
        }
    }
}