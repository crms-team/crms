import AWS from './aws'
import AZURE from './azure'

export const DataFormat = {
    aws: AWS,
    azure: AZURE
}

export function CreateVisualDataFormat(keyId, vendor, data) {
    let result = new Set()
    let parents = {}

    result.add({
        id: keyId,
        name: keyId,
        type: vendor,
        link: [],
        children: []
    })

    for (let session in data) {
        for (let type in data[session]) {
            if (type in DataFormat[vendor][session]) {
                for (let resource of data[session][type]){
                    let resourceObj = new DataFormat[vendor][session][type](keyId, resource)
                    result.add(resourceObj.json())
                    if (resourceObj.hasParent()) {
                        let parent = resourceObj.parentJson()
                        if (parents[parent.type] == undefined) {
                            parents[parent.type] = new Set()
                            parents[parent.type].add(parent.id)
                        } else {
                            if (parents[parent.type].has(parent.id)) {
                                continue
                            }
                        }
                        result.add(parent)
                    }
                }    
            }
        }
    }

    return Array.from(result)
} 

