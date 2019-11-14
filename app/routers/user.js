const router = require('koa-router')()
const routers = router
    .get('/info', async () => {
        ctx.body = ctx.params
    })
    .post('/signIn', async () => {
        let postData = ctx.request.body
        ctx.body = postData
    })
    .post('/signUp', async () => {
        let postData = ctx.request.body
        ctx.body = postData
    })
module.exports = routers