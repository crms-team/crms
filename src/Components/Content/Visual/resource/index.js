import AWS from './aws'


export const DataFormat = {
    aws: AWS
}


export function CreateVisualDataFormat(vendor, data) {
    let result = []
    console.log(data)
    for (let session in data) {
        try {

            for (let type in data[session]) {
                for (let resource of data[session][type]){
                    let resourceObj = new DataFormat[vendor][session][type](resource)
                    result.push(resourceObj.json())
                }
            }
        } catch {

        }
    }
    return result
} 

