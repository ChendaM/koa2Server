/**
 * restful api 子路由
 */
const router = require('koa-router')()
const pool = require('../utils/db-util')
const routers = router
    .get('/', async (ctx) => {
        ctx.body = ctx.params
    })
    .post('/user/:userId', async (ctx) => {
        ctx.body = {
            params: ctx.params,
            query: ctx.query
        }
    })
    .post('/login', async (ctx) => {
        let postData = ctx.request.body
        if (postData.email && postData.password) {
            try {
                let res = await pool.query('SELECT * FROM user')
                ctx.body = res
            } catch (err) {
                ctx.body = {
                    code: 400,
                    data: 'SQL错误'
                }
            }
        } else {
            ctx.body = {
                code: 400,
                data: '缺少必要参数'
            }
        }
    })
    .get('aap', async (ctx) => {
        ctx.body = ctx.query
    })

module.exports = routers