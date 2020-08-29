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
    
    rds: resource => resource['DBInstanceIdentifier'],

    s3: resource => resource['Name'],

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
        fs.mkdirSync(path, {recursive: true})
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

    if (result.create == 0 && result.modify == 0 && result.remove ==0){
        return undefined
    } else {
        return result
    }
}

function history(path, keyId, data, time) {
    let historyData = []
    let prevData = null
    let detail = {}
    let check = false
    let historyPath = PATH.normalize(`${path}/data/${keyId}/history.json`)

    try { 
        let readHistory = fs.readFileSync(historyPath)
        let lastFileName = getLastDataFileName(path, keyId)
        prevData = JSON.parse(fs.readFileSync(PATH.normalize(`${path}/data/${keyId}/log/${lastFileName}`)).toString())

        historyData = JSON.parse(readHistory)
    } catch {
        fs.closeSync(fs.openSync(historyPath, 'w'))
     }
     
    for (let session in data) { 
        detail[session] = {}
        for (let resourceType in data[session]) {
            let nowResources = data[session][resourceType]
            let preResources = prevData != null ? prevData[session][resourceType]: []
            let cpResource = compareResources(resourceType, preResources, nowResources)

            if (cpResource != undefined) {
                detail[session][resourceType] = cpResource
            }
        }
        check |= Object.keys(detail[session]).length != 0
    }

    if (check) {
        historyData.push({
            time: time,
            detail: detail
        })

        fs.writeFileSync(historyPath, JSON.stringify(historyData))    
    }
}
    
function changeFormat(val) {
    return val < 10 ? `0${val}` : `${val}`
}

function getTime() {
    let date = new Date()
    let timeString = date.toLocaleTimeString('it-IT').replace(/:/g, '.')

    return `${date.getFullYear()}.${changeFormat(date.getMonth() + 1)}.${changeFormat(date.getDate())} ${timeString}`
}

async function saveData(path, keyId, keyVendor, keyData){
    try {
        console.log(`${getTime()} Start Scanning ${keyId}`) 
        let dataPath = PATH.normalize(`${path}/data/${keyId}/log`)    
        let data = await vendors[keyVendor].data.getAllData(keyData)
        createDataDict(dataPath)

        let time = getTime()
        let fileName =  `${time}.json`
        
        history(path, keyId, data, time)
        fs.writeFileSync(PATH.normalize(`${dataPath}/${fileName}`), JSON.stringify(data))
        console.log(`${getTime()} Success Scanning ${keyId}`) 
    } catch (e) {
        console.log(e)
        console.log("saveData function Error")
    }
}

module.exports = {
    saveData: saveData,
    getLastDataFileName: getLastDataFileName
}

