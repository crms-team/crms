const fs = require('fs')
const PATH =  require('path')
const vendors = {
    aws: require('./aws'),
    azure: require('./azure')
}

function getLastDataFileName(path, keyId){
    let dataDict = PATH.normalize(`${path}/data/${keyId}/log`)
    let list = fs.readdirSync(dataDict).sort()
    try {
        return list[list.length - 1]
    } catch {
        return undefined
    }
}

function createDataDict(path) {
    try {
        fs.statSync(path)
    } catch {
        fs.mkdirSync(path, {recursive: true})
    }
}

function compareObject(obj1, obj2) {
    let result = {}
    let key1 = Object.keys(obj1)
    let key2 = Object.keys(obj2)

    let keys = Array.from(new Set([...key1, ...key2]))

    for (let key of keys) {
        let val1 = typeof obj1[key] == 'object' ? JSON.stringify(obj1[key]) : obj1[key]
        let val2 = typeof obj2[key] == 'object' ? JSON.stringify(obj2[key]) : obj2[key]
        
        if (val1 != val2) {
            result[key] = { 'before': obj1[key], 'after': obj2[key]}
        }
    }

    return result
}

function makeDetailObject(obj1, obj2) {
    let key1 = Object.keys(obj1)
    let key2 = Object.keys(obj2)

    let keys = Array.from(new Set([...key1, ...key2]))
    let result = {}

    for (let key of keys) {
        let val1 = typeof obj1[key] == 'object' ? JSON.stringify(obj1[key]) : typeof obj1[key] == 'undefined' ? '' : obj1[key]
        let val2 = typeof obj2[key] == 'object' ? JSON.stringify(obj2[key]) : typeof obj2[key] == 'undefined' ? '' : obj2[key]

        result[key] = {
            before: val1,
            after: val2
        }
    }
    
    return result
}

function compareResources(vendor, type, preData, nowData) {
    if (nowData == undefined) {
        return undefined
    }
    let result = {
        create: [],
        remove: [],
        modify: []
    }

    let xPreData = {}
    let xNowData = {}

    let preIdSet = new Set()
    let nowIdSet = new Set()

    let idFunc = vendors[vendor].getResourceId[type]

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
            result['create'].push({
                id: id,
                detail: makeDetailObject({}, xNowData[id])
            })
        } else if (!nowIdSet.has(id)) {
            result['remove'].push({
                id: id,
                detail: makeDetailObject(xPreData[id], {})
            })
        } else {
            if (JSON.stringify(xPreData[id]) != JSON.stringify(xNowData[id])) {
                result['modify'].push({
                    id: id,
                    detail: compareObject(xPreData[id], xNowData[id])
                })
            }
        }
    }

    if (result.create == 0 && result.modify == 0 && result.remove ==0){
        return undefined
    } else {
        return result
    }
}

function history(path, keyId, vendor, data, time) {
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
            let preResources = prevData != null ? prevData[session][resourceType.toLocaleLowerCase()]: []
            let cpResource = compareResources(vendor, resourceType, preResources, nowResources)

            if (cpResource != undefined) {
                detail[session][resourceType] = cpResource
            }
        }
        check |= Object.keys(detail[session]).length != 0

        if (JSON.stringify(detail[session]) == '{}') {
            delete detail[session]
        }
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
    let strDate = `${date.getFullYear()}.${changeFormat(date.getMonth() + 1)}.${changeFormat(date.getDate())}` 
    let strTime = `${changeFormat(date.getHours())}.${changeFormat(date.getMinutes())}.${changeFormat(date.getSeconds())}`
    return `${strDate} ${strTime}`
}

async function saveData(path, keyId, keyVendor, keyData){
    try {
        console.log(`${getTime()} Start Scanning ${keyId}`) 
        let dataPath = PATH.normalize(`${path}/data/${keyId}/log`)    
        let data = await vendors[keyVendor].data.getAllData(keyData)
        createDataDict(dataPath)

        let time = getTime()
        let fileName = `${time}.json`
        
        history(path, keyId, keyVendor, data, time)
        fs.writeFileSync(PATH.normalize(`${dataPath}/${fileName}`), JSON.stringify(data))
        console.log(`${getTime()} Success Scanning ${keyId}`) 
        return true
    } catch (e) {
        console.log(`saveData function Error (Maybe Key Error) [Key:${keyId}]`)
        return false
    }
}

module.exports = {
    saveData: saveData,
    getLastDataFileName: getLastDataFileName,
}

