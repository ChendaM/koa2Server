const router = require('koa-router')()
const userControllers = require('../controllers/user')
const routers = router
    .get('/info', async () => {
        ctx.body = ctx.params
    })
    .post('/signIn', userControllers.signIn)
    .post('/signUp', userControllers.signUp)
module.exports = routers