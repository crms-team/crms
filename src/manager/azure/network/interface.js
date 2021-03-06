import { Manager } from "../../manager";

export class InterfaceManager extends Manager {
    static endpoint() {
        return `${process.env.REACT_APP_SERVER_URL}/api/cloud/data/networkinterface`
    }

    static async delete(keyId, args) {
        return await fetch(this.endpoint(), {
            method: "delete",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key_id: keyId,
                args: args
            })
        }).then(res => res.json())
    }

}
