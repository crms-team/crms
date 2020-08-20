
export class CloudResourceDataFormat {
    constructor () {
        this.id = undefined;
        this.name = undefined;
        this.type = undefined;
        this.links = []
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

    getTagName(tagData) {
        for (let tag of tagData) {
            if (tag.Key == "Name")
                return tag.Value
        }
        return undefined
    }
}
