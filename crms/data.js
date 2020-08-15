const fs = require('fs')
const awsData = require('./aws/data')

function createDataDict(path) {
    try {
        fs.statSync(path)
    } catch {
        fs.mkdirSync(path)
    }
}

function saveData(path, keyId, keyVendor, keyData){
    try { 
        let dataPath = `${path}/data/${keyId}`    
        let data = null
        createDataDict(dataPath)

        switch (keyVendor) {
            case 'aws': {
                data = awsData.getAWSData(keyData.keys)
                break;
            }
            default: {
                console.log("Not Support Vendor")
                return
            }
        }
        
        let fileName = (new Date()).toLocaleString() + ".json"
        fs.writeFileSync(`${dataPath}/${fileName}`, JSON.stringify(data))
    } catch (e) {
        console.log(e)
        console.log("saveData function Error")
    }
}

module.exports = {
    saveData: saveData
}