import { Manager } from "../../manager";


export class SubnetManager extends Manager {
    static endpoint() {
        return `${process.env.REACT_APP_SERVER_URL}/api/cloud/data/subnet`
    }

    static async update(keyId, args) {
        return await fetch(this.endpoint(), {
            method: "put",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key_id: keyId,
                args: args            
            })
        }).then(res=>res.json())
    }


    static async create(keyId, args) {
        return await fetch(this.endpoint(), {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key_id: keyId,
                args: args
            })
        }).then(res=>res.json())
    }

    static async delete(keyId, id) {
        return await fetch(this.endpoint(), {
            method: "delete",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key_id: keyId,
                args: {
                    SubnetId: id 
                }
            })
        }).then(res=>res.json())
    }

}
