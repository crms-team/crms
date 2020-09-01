const AWS = require('aws-sdk')

async function describeDBInstances(key, args=undefined) {
    AWS.config.update(key)
    let rds = new AWS.RDS({ apiVersion: '2014-10-31' })
    return (await rds.describeDBInstances().promise())['DBInstances']
}

async function createDBInstance(key, args=undefined) {
    AWS.config.update(key)
    let rds = new AWS.RDS({ apiVersion: '2014-10-31' })

    try {
        return (await rds.createDBInstance(args).promise())['DBInstance']
    } catch(e) {
        console.log(e)
        console.log("RDS POST Error (createDBInstance Error)")
        return false
    }    
}

async function modifyDBInstance(key, args=undefined) {
    AWS.config.update(key)
    let rds = new AWS.RDS({ apiVersion: '2014-10-31' })

    try {
        return (await rds.modifyDBInstance(args).promise())
    } catch {
        console.log("RDS PUT Error (modifyDBInstance Error)")
        return false
    }    
}

async function deleteDBInstance(key, args=undefined) {
    AWS.config.update(key)
    let rds = new AWS.RDS({ apiVersion: '2014-10-31' })

    try {
        return (await rds.deleteDBInstance(args).promise())
    } catch(e) {
        console.log(e)
        console.log("RDS DELETE Error (deleteDBInstance Error)")
        return false
    }    
}

async function startDBInstance(key, args=undefined) {
    AWS.config.update(key)
    let rds = new AWS.RDS({ apiVersion: '2014-10-31' })

    try {
        (await rds.startDBInstance(args).promise())
        return true
    } catch {
        console.log("RDS Start Error (startDBInstance Error)")
        return false
    }    
}

async function stopDBInstance(key, args=undefined) {
    AWS.config.update(key)
    let rds = new AWS.RDS({ apiVersion: '2014-10-31' })

    try {
        (await rds.stopDBInstance(args).promise())
        return true
    } catch {
        console.log("RDS Stop Error (stopDBInstance Error)")
        return false
    }    
}



module.exports = {
    default: {
        get: describeDBInstances,
        post: createDBInstance,
        put: modifyDBInstance,
        delete: deleteDBInstance
    },
    etc: {
        start: startDBInstance,
        stop: stopDBInstance
    }
}

