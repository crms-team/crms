const AWS = require('aws-sdk')

async function listBuckets(key, args=undefined) {
    AWS.config.update(key)
    let s3 = new AWS.S3({ apiVersion: '2006-03-01' })
    return (await s3.listBuckets().promise())['Buckets']
}

async function createBucket(key, args=undefined) {
    AWS.config.update(key)
    let s3 = new AWS.S3({ apiVersion: '2006-03-01' })
    try {
        await s3.createBucket(args).promise()
        return true
    } catch {
        console.log("S3 POST Error (createBucket Errir)")
        return false
    }
}

async function deleteBucket(key, args=undefined) {
    AWS.config.update(key)
    let s3 = new AWS.S3({ apiVersion: '2006-03-01' })
    try {
        await s3.deleteBucket(args).promise()
        return true
    } catch {
        console.log("S3 DELETE Error (deleteBucket Errir)")
        return false
    }
}



module.exports = {
    default: {
        get: listBuckets,
        post: createBucket,
        delete: deleteBucket
    },
    etc: {}
}