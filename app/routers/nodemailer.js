const router = require('koa-router')()
const nodemailer = require('nodemailer')
function sendmail(mail) {
    return new Promise((reslove, reject) => {
        //检测邮箱地址是否为空
        if (!mail) {
            reslove('请输入邮箱地址！')
        }
        //检测邮箱地址是否符合规范
        var reg = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,5}$/;
        if (!mail.match(reg)) {
            reslove('邮箱地址不符合规范，请重新输入！')
        }
        //邮件发送
        var transporter = nodemailer.createTransport({
            service: 'qq',
            host: 'localhost',
            // secure:false,
            // secureConnection:false,
            auth: {
                user: 'xxxxx@qq.com',//邮箱账号
                pass: 'xxxxx'
                //邮箱密码 QQ的需要 温馨提示：在第三方登录QQ邮箱，可能存在邮件泄露风险，甚至危害Apple ID安全，建议使用QQ邮箱手机版登录。继续获取授权码登录第三方客户端邮箱 。 生成授权码
            }
        });
        var mailOptions = {
            from: 'xxxxx@qq.com', // sender address
            to: mail, // list of receivers
            subject: '测试邮件', // Subject line
            text: 'Nodejs之邮件发送', // plaintext body
            html: "<h2>欢迎关注我的GitHub，一起学习Nodejs。https://github.com/Chen-xy</h2>"
        };

        transporter.sendMail(mailOptions, function (error, info) {
            console.log(info)
            if (!error) {
                reslove('邮件发送成功，请注意查收！')
            } else {
                reslove(error)
            }
        });
    })

};
const routers = router.get('/', async (ctx) => {
    let s = await sendmail('xxxx@gmail.com')
    console.log(s)
    ctx.body = s

})
module.exports = routers