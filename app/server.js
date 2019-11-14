// console.log('koa runing')
// console.log(process.env.NODE_ENV)
import Koa from 'koa';
import convert from 'koa-convert';
import onerror from 'koa-onerror' //错误处理
import resource from 'koa-static' //静态资源托管
import koaBody from 'koa-body' // 接收上传文件中间件
import session from 'koa-session-minimal' // session
import path from 'path'
import routers from './routers/index'
//适配vue history的中间件
// const { historyApiFallback } = require('koa2-connect-history-api-fallback')
// import logger from 'koa-logger'; // 访问日志
// import Moment from 'Moment'; // 格式化时间
const { logger, accessLogger } = require('./utils/logger'); //日志输出
// import path from 'path';
const app = new Koa();
onerror(app); // 监听错误
// 保存所有访问到日志文件中
app.use(convert(accessLogger()));
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 2000 * 1024 * 1024    // 设置上传文件大小最大限制，默认20M
    }
}))
app.use(session({
    key: 'session-id'
}))
// handle fallback for HTML5 history API
// app.use(historyApiFallback({ whiteList: ['/api','/ds'],index: '/_orders/index.html' }));
app.use(resource(path.join(__dirname, '../public')))
app.use(async (ctx, next) => {
    console.log(ctx.session)
    logger.error(ctx);
    const start = new Date()
    await next();
    const ms = new Date() - start
    // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    // ctx.body = `<h2>hello world</h2><p>${Moment().format('YYYY-MM-DD HH:mm:ss')}</p>`;
})
// routers
app.use(routers.routes(), routers.allowedMethods());
app.on('error', (error, ctx) => {
    // 保存错误到日志log文件中
    logger.error(error);
    console.log('奇怪的错误' + JSON.stringify(ctx.onerror))
    // console.log('server error:' + error)
})
app.listen(9999, function () {
    console.log('正在监听端口' + 9999)
})