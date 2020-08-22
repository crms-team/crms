const fs = require('fs')
const PATH =  require('path')
const vendors = {
    aws: require('./aws')
}

const resourceIdKeys = {
    ec2: resource => resource['Instances'][0]['InstanceId'],
    ebs: resource => resource['VolumeId'],
    eip: resource => resource['AllocationId'],
    keyPair: resource => resource['KeyPairId'],
    
    vpc: resource => resource['VpcId'],
    subnet: resource => resource['SubnetId'],
    securityGroup: resource => resource['GroupId'],
    internetGateway: resource => resource['InternetGatewayId']
} 

function getLastDataFileName(path, keyId){
    let dataDict = PATH.normalize(`${path}/data/${keyId}/log`)
    let list = fs.readdirSync(dataDict).sort()

    return list[list.length - 1]
}

function createDataDict(path) {
    try {
        fs.statSync(path)
    } catch {
        fs.mkdirSync(path)
    }
}

function compareResources(type, preData, nowData) {
    let result = {
        create: [],
        remove: [],
        modify: []
    }

    let xPreData = {}
    let xNowData = {}

    let preIdSet = new Set()
    let nowIdSet = new Set()
    let idFunc = resourceIdKeys[type]

    for (let resource of preData) {
        let id = idFunc(resource)
        preIdSet.add(id)
        xPreData[id] = resource
    }
    
    for (let resource of nowData) {
        let id = idFunc(resource)
        nowIdSet.add(id)
        xNowData[id] = resource
    }

    let allIds = Array.from(new Set([...preIdSet, ...nowIdSet]))

    for (let id of allIds) {
        if (!preIdSet.has(id)) {
            result['create'].push(id)
        } else if (!nowIdSet.has(id)) {
            result['remove'].push(id)
        } else {
            if (JSON.stringify(xPreData[id]) != JSON.stringify(xNowData[id])) {
                result['modify'].push(id)
            }
        }
    }

    return result
}

async function history(path, keyId, data, time) {
    let historyData = []
    let prevData = null
    let detail = {}

    try { 
        let readHistory = fs.readFileSync(PATH.normalize(`${path}/data/${keyId}/history.json`))
        let lastFileName = getLastDataFileName(path, keyId)
        prevData = JSON.parse(fs.readFileSync(PATH.normalize(`${path}/data/${keyId}/log/${lastFileName}`)).toString())

        historyData = JSON.parse(readHistory)
    } catch { }

    for (let session in data) { 
        detail[session] = {}
        for (let resourceType in data[session]) {
            let nowResources = data[session][resourceType]
            let preResources = prevData != null ? prevData[session][resourceType]: []
            detail[session][resourceType] = compareResources(resourceType, preResources, nowResources)                
        }
    }
    historyData.push({
        time: time,
        detail: detail
    })

    fs.writeFileSync(PATH.normalize(`${path}/data/${keyId}/history.json`), JSON.stringify(historyData))
}

async function saveData(path, keyId, keyVendor, keyData){
    try {
        console.log(`${(new Date()).toLocaleString()} Start Scanning ${keyId}`) 
        let dataPath = PATH.normalize(`${path}/data/${keyId}/log`)    
        let data = await vendors[keyVendor].data.getAllData(keyData)
        createDataDict(dataPath)
        
        let time = (new Date()).toLocaleString().replace(/:/g, '-')
        let fileName =  `${time}.json`
        
        history(path, keyId, data, time)
        fs.writeFileSync(PATH.normalize(`${dataPath}/${fileName}`), JSON.stringify(data))
        console.log(`${(new Date()).toLocaleString()} Success Scanning ${keyId}`) 
    } catch (e) {
        console.log(e)
        console.log("saveData function Error")
    }
}

module.exports = {
    saveData: saveData,
    getLastDataFileName: getLastDataFileName
}
