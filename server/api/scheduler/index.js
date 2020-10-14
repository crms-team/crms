const fs = require('fs')
const PATH = require('path')

module.exports = server => {
    server.get('/api/scheduler', (req, res) => {
        let schedulerData = []
        try {
            const path = server.config.path
            schedulerData = JSON.parse(fs.readFileSync(PATH.normalize(`${path}/data/scheduler.json`)))
        } catch {}

        res.send({
            result: true,
            schedulerData: schedulerData
        })
    })
    
    server.post('/api/scheduler', (req, res) => {
        const keyId = req.body.keyId
        const time = req.body.time
        const type = req.body.type
        const session = req.body.session
        const args = req.body.args
        const resourceId = req.body.resourceId

        if (keyId == undefined || time == undefined ||
            time.hour >= 24 || time.hour < 0 ||
            time.min >= 60 || time.min < 0 ||
            type == undefined || session == undefined) {
            res.send({ result: false, msg: 'Missing Required Params' })
            return
        }

        const path = server.config.path

        let schedulerData = undefined
        
        try {
            schedulerData = JSON.parse(fs.readFileSync(PATH.normalize(`${path}/data/scheduler.json`)))
        } catch {
            schedulerData = []
        }

        schedulerData.push({
            schedulerId: Date.now() % 1000000000,
            keyId: keyId,
            time: time,
            type: type,
            session: session,
            resourceId: resourceId,
            args: args
        })
        fs.writeFileSync(PATH.normalize(`${path}/data/scheduler.json`), JSON.stringify(schedulerData))
        res.send({result: true})
    })
    
    server.delete('/api/scheduler', (req, res)=>{
        const schedulerId = req.query.schedulerId
        const path = server.config.path

        let schedulerData = undefined
        
        try {
            schedulerData = JSON.parse(fs.readFileSync(PATH.normalize(`${path}/data/scheduler.json`)))
        } catch {
            schedulerData = []
        }

        for (let i in schedulerData) {
            if (schedulerData[i].schedulerId == schedulerId) {
                schedulerData.splice(i, 1)
                break
            }
        }

        fs.writeFileSync(PATH.normalize(`${path}/data/scheduler.json`), JSON.stringify(schedulerData))
        res.send({result: true})
    })
}