import { Manager } from "../../manager";

export class DiskManager extends Manager {
    static endpoint() {
        return `${process.env.REACT_APP_SERVER_URL}/api/cloud/data/volume`;
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

    static async attach(keyId, args) {
        return await fetch(this.endpoint() + "/etc/attach", {
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

    static async detach(keyId, args) {
        return await fetch(this.endpoint() + "/etc/detach", {
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
