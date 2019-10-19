const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
// 读取当前目录文件夹下的所有文件
const files = fs.readdirSync(__dirname)
// 筛选目录下的JS文件
files.filter(file => ~file.search(/^[^\.].*\.js$/)).forEach(file => {
    const file_name = file.substr(0, file.length - 3);
    if (file_name !== 'index') {
        const file_entity = require(path.join(__dirname, file));
        router.use(`/${file_name}`, file_entity.routes(), file_entity.allowedMethods())
    }
})
// 自动加载routers文件夹下的路由
export default router
