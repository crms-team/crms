import AWS from './aws'

export const DataFormat = {
    aws: AWS
}


export function CreateVisualDataFormat(vendor, data) {
    let result = [{
        id: "Cloud",
        name: "Cloud",
        type: vendor,
        links: []
    }]
    
    for (let session in data) {
        for (let type in data[session]) {
            for (let resource of data[session][type]){
                let resourceObj = new DataFormat[vendor][session][type](resource)
                result.push(resourceObj.json())
            }
        }
    }

    return result
} 

