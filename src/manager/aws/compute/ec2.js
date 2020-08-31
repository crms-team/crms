import { Manager } from "../../manager";


export class EC2Manager extends Manager {
    static endpoint() {
        return 'http://localhost:4000/api/cloud/data/ec2'
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


    static async create (keyId, args) {
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

    static async start(keyId, id) {
        return await fetch(this.endpoint() + '/etc/start', {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key_id: keyId,
                args: {
                    InstanceIds: [ id ]
                }
            })
        }).then(res=>res.json())
    }

    static async stop(keyId, id) {
        return await fetch(this.endpoint() + '/etc/stop', {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key_id: keyId,
                args: {
                    InstanceIds: [ id ]
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
                    InstanceIds: [ id ]
                }
            })
        }).then(res=>res.json())
    }

}
