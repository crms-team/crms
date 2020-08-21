
export class CloudResourceDataFormat {
    constructor (keyId) {
        this.id = undefined;
        this.name = undefined;
        this.type = undefined;
        this.links = []
        this.keyId = keyId
    }

    json() {
        return {
            id: this.id,
            name: this.name,
            links: this.links,
            type: this.type,
            data: this.data
        }
    }

    makeId(type, id) {
        return `${this.keyId}:${type}:${id}`
    }

    hasParent(){
        return Boolean(this.parent)
    }

    parentJson(){
        return this.parent.json()
    }
}
