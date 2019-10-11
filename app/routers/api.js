/**
 * restful api 子路由
 */

const router = require('koa-router')()

const routers = router
    .get('/', async (ctx) => {
        ctx.body = ctx.params
    })
    .get('/user', async (ctx) => {
        ctx.body = ctx.params
    })
    .post('/login', async (ctx) => {
        console.log(ctx)
    })
    .get('aap', async (ctx) => {
        ctx.body = ctx.query
    })

module.exports = routers