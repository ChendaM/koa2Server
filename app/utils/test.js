const fs = require('fs')
const path = require('path')
async function test() {
    let readSTream = fs.createReadStream(__dirname + '/logger-async.js', { encoding: 'utf-8' })
    // 读取文件
    // let a = fs.readFileSync(__dirname + '/logger-async.js', { encoding: 'utf-8' })
    // let a = await readFileFn(__dirname + '/logger-async2.js')
}
// test()
// fs.writeFile(__dirname+"/11.js", "我是要写入的11.txt文件的内容", { flag: "a" }, function (err) {
//     console.log(err)
//     if (err) {
//         return console.log(err);
//     } else {
//         console.log("写入成功");
//     }
// })

function readFileFn(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, function (err, data) {
            if (err) {
                console.log('错误了')
                // console.log(err)
                reject(err)
            }
            console.log('返回数据')
            resolve(data)
        })
    })
}
// console.log("准备删除文件！");
// fs.unlink('tmp/a.tex', function (err) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log("文件删除成功！");
// });
// 创建目录
// tmp 目录必须存在
// console.log("创建目录 /tmp/");
// fs.rmdir("tmp2",function(err){
//    if (err) {
//        return console.error(err);
//    }
//    console.log("目录创建成功。");
// });
// console.log(__dirname)
// console.log(__filename)
// console.log(process.cwd())
function delDir(path) {
    let files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
    }
    console.log(files)
}
// fs.readFile('input.txt', function (err, data) {
//     if (err){
//        console.log(err);
//        return;
//     }
//     console.log(data.toString());
//  });
 console.log("程序执行完毕");
 console.log(path.resolve(__dirname, '/tmp'))
 console.log(path.join(__dirname, '/tmp'))