const passwd = require('./passwd')
const cloud = require('./cloud')
const dashboard = require('./dashboard')

module.exports = server => {
    passwd(server)
    dashboard(server)
    cloud(server)
}