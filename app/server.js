console.log('koa runing')
console.log(process.env.NODE_ENV)
import Koa from 'koa';
import http from 'http'
const app = new Koa();
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    ctx.body='hello world';
})
http.createServer(app.callback()).listen(9999).on('listening', function () {
    console.log('正在监听端口' + 9999)
})