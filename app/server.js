// console.log('koa runing')
// console.log(process.env.NODE_ENV)
import Koa from 'koa';
import convert from 'koa-convert';
import onerror from 'koa-onerror' //错误处理
import resource from 'koa-static' //静态资源托管
import bodyParser from 'koa-bodyparser' //请求体JSON解析
import path from 'path'
// import logger from 'koa-logger'; // 访问日志
// import Moment from 'Moment'; // 格式化时间
const { logger, accessLogger } = require('./utils/logger'); //日志输出
// import path from 'path';
const app = new Koa();
onerror(app); // 监听错误
// 保存所有访问到日志文件中
app.use(convert(accessLogger()));
app.use(bodyParser())
app.use(resource(path.join(__dirname, '../public')))
app.use(async (ctx, next) => {
    const start = new Date()
    await next();
    const ms = new Date() - start
    // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    // ctx.body = `<h2>hello world</h2><p>${Moment().format('YYYY-MM-DD HH:mm:ss')}</p>`;
    let postData = ctx.request.body
    console.log(ctx.request)
    let url = ctx.url
    // 从上下文的request对象中获取
    let request = ctx.request
    let req_query = request.query
    let req_querystring = request.querystring

    // 从上下文中直接获取
    let ctx_query = ctx.query
    let ctx_querystring = ctx.querystring

    ctx.body = {
        url,
        req_query,
        req_querystring,
        ctx_query,
        ctx_querystring
    }
})
app.on('error', (error, ctx) => {
    // 保存错误到日志log文件中
    logger.error(error);
    console.log('奇怪的错误' + JSON.stringify(ctx.onerror))
    // console.log('server error:' + error)
})
app.listen(9999, function () {
    console.log('正在监听端口' + 9999)
})