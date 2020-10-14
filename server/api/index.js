const passwd = require('./passwd')
const cloud = require('./cloud')
const dashboard = require('./dashboard')
const swagger = require('./swagger')
const scheduler = require('./scheduler')

module.exports = server => {
    swagger(server)
    passwd(server)
    dashboard(server)
    cloud(server)
    scheduler(server)
}