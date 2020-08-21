import AWS from './aws'

export const DataFormat = {
    aws: AWS
}

export function CreateVisualDataFormat(keyId, vendor, data) {
    let result = new Set()
    
    result.add({
        id: keyId,
        name: keyId,
        type: vendor,
        links: []
    })

    for (let session in data) {
        for (let type in data[session]) {
            for (let resource of data[session][type]){
                let resourceObj = new DataFormat[vendor][session][type](keyId, resource)
                result.add(resourceObj.json())
                if (resourceObj.hasParent()) {
                    result.add(resourceObj.parentJson())
                }
            }
        }
    }

    return Array.from(result)
} 

