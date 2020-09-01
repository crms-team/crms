const AWS = require('aws-sdk')

async function listBuckets(key, args=undefined) {
    AWS.config.update(key)
    let s3 = new AWS.S3({ apiVersion: '2006-03-01' })
    let result = []

    let buckets = (await s3.listBuckets().promise())['Buckets']

    for (let bucket of buckets) {
        let encryption = null
        let publicAccess = null
        let tags = null
        let location = null

        try {
            encryption = (await s3.getBucketEncryption({
                Bucket: bucket.Name
            }).promise())['ServerSideEncryptionConfiguration']
        } catch { }

        try {
            publicAccess = (await s3.getPublicAccessBlock({
                Bucket: bucket.Name
            }).promise())['PublicAccessBlockConfiguration']
        } catch {}

        try {
            tags = (await s3.getBucketTagging({
                Bucket: bucket.Name
            }).promise())['TagSet']
        } catch {}

        try {
            location = (await s3.getBucketLocation({
                Bucket: bucket.Name
            }).promise())['LocationConstraint']
        } catch { }

        result.push({
            Name: bucket.Name,
            CreationDate: bucket.CreationDate,
            Encryption: encryption,
            PublicAccessBlockConfiguration: publicAccess,
            Tags: tags,
            LocationConstraint: location
        })
    }

    return result
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