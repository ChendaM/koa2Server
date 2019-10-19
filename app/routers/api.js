/**
 * restful api 子路由
 */
const fs = require('fs')
const router = require('koa-router')()
async function getFile(ctx) {
    const file = ctx.request.files.file    // 获取上传文件
    const reader = fs.createReadStream(file.path)    // 创建可读流
    const ext = file.name.split('.').pop()        // 获取上传文件扩展名
    const fileName = file.name.slice(0, file.name.lastIndexOf('.'))
    const fileDir = await createDir('upload')
    if (fileDir) {
        const upStream = fs.createWriteStream(`upload/${fileName}${Math.random().toString()}.${ext}`)        // 创建可写流
        reader.on('data', function (data) {
            console.log('数据可读')
        });
        reader.on('end', function () {
            console.log('文件读取完成');
            //ws.end('再见')
        });
        reader.pipe(upStream);    // 可读流通过管道写入可写流
    } else {
        console.log("错误")
    }
}
const routers = router
    .get('/', async (ctx) => {
        ctx.body = ctx.params
    })
    .get('/user/:userId', async (ctx) => {
        console.log(ctx.params)
        ctx.body = {
            params: ctx.params,
            query: ctx.query
        }
    })
    .post('/login', async (ctx) => {
        let postData = ctx.request.body
        if (ctx.request.files && ctx.request.files.file) {
            getFile(ctx)
        }
        ctx.body = postData
    })
    .get('aap', async (ctx) => {
        ctx.body = ctx.query
    })
function createDir(dirPath) {
    return new Promise((resolve, reject) => {
        fs.stat(dirPath, (err, stats) => {
            if (err) {
                // 不存在，需要创建
                console.log(err)
                fs.mkdir(dirPath, err => {
                    if (err) {
                        resolve(false)
                    } else {
                        resolve(true)
                    }
                })
            } else {
                console.log(stats)
                if (stats.isDirectory()) {
                    // 不需要创建
                    resolve(true)
                } else if (stats) {     //如果该路径存在但是文件，返回false
                    console.log('是文件')
                    // 是文件，需要创建
                    fs.mkdir(dirPath, err => {
                        if (err) {
                            resolve(false)
                        } else {
                            resolve(true)
                        }
                    })
                }
            }
        })
    })
}
module.exports = routers