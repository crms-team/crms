const fetch = require('node-fetch')
const getToken = require('../token')

async function databases(key, args = undefined) {

}


module.exports = {
    default: {
        get: databases,
    },
    etc: { }
}