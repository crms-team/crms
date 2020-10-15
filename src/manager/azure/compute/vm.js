import { Manager } from "../../manager";

export class VMManager extends Manager {
    static endpoint() {
        return `${process.env.REACT_APP_SERVER_URL}/api/cloud/data/server`;
    }

    static async update(keyId, args) {
        return await fetch(this.endpoint(), {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                key_id: keyId,
                args: args,
            }),
        }).then((res) => res.json());
    }

    static async create(keyId, args) {
        return await fetch(this.endpoint(), {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                key_id: keyId,
                args: args,
            }),
        }).then((res) => res.json());
    }

    static async start(keyId, args) {
        return await fetch(this.endpoint() + "/etc/start", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                key_id: keyId,
                args: args,
            }),
        }).then((res) => res.json());
    }

    static async stop(keyId, args) {
        return await fetch(this.endpoint() + "/etc/stop", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                key_id: keyId,
                args: args,
            }),
        }).then((res) => res.json());
    }

    static async delete(keyId, args) {
        return await fetch(this.endpoint(), {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                key_id: keyId,
                args: args,
            }),
        }).then((res) => res.json());
    }
}
