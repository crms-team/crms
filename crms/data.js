const fs = require('fs')
const PATH =  require('path')
const awsData = require('./aws/data')

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
        let data = null
        createDataDict(dataPath)
        
        switch (keyVendor) {
            case 'aws': {
                data = await awsData.getAWSData(keyData)
                break;
            }
            default: {
                console.log("Not Support Vendor")
                return
            }
        }        
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