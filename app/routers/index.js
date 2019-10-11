const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
// 读取当前目录文件夹下的所有文件
const files = fs.readdirSync(__dirname)
// 筛选目录下的JS文件
files.filter(file => ~file.search(/^[^\.].*\.js$/)).forEach(file => {
    const file_name = file.substr(0, file.length - 3);
    console.log('file_name------' + file_name)
    if (file_name !== 'index') {
        const file_entity = require(path.join(__dirname, file));
        router.use(`/${file_name}`, file_entity.routes(), file_entity.allowedMethods())
    }
})

export default router
