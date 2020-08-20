const fs = require('fs')
const PATH =  require('path')
const vendors = {
    aws: require('./aws')
}

function createDataDict(path) {
    try {
        fs.statSync(path)
    } catch {
        fs.mkdirSync(path)
    }
}

async function saveData(path, keyId, keyVendor, keyData){
    try { 
        let dataPath = PATH.normalize(`${path}/data/${keyId}`)    
        let data = await vendors[keyVendor].data.getAllData(keyData)
        createDataDict(dataPath)
                
        let fileName = (new Date()).toISOString().replace(/:/g, '-').replace('T', ' ').split('.')[0] + ".json"
        fs.writeFileSync(PATH.normalize(`${dataPath}/${fileName}`), JSON.stringify(data))
    } catch (e) {
        console.log(e)
        console.log("saveData function Error")
    }
}

module.exports = {
    saveData: saveData
}
