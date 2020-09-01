import { Manager } from "../../manager";

export class SecurityGroupManager extends Manager{
    static endpoint() {
        return `${process.env.REACT_APP_SERVER_URL}/api/cloud/data/securitygroup`
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

    static async update(keyId, args) {
        return await fetch(this.endpoint(), {
            method: "put",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key_id: keyId,
                args: {
                    type: args.type,
                    method: args.method,
                    data: args.args
                }
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
                    GroupId: id 
                }
            })
        }).then(res=>res.json())
    }
}
