const fetch = require('node-fetch')

async function getToken(key) {
    let client_id = key.client_id
    let tenant_id = key.tenant_id
    let secret_key = key.secret_key
    let response = await fetch(
        `https://login.microsoftonline.com/${tenant_id}/oauth2/token`,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
            body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${secret_key}&resource=https://management.azure.com/`,
        }
    ).then((res) => res.json())
    return response["access_token"]
}


module.exports = getToken