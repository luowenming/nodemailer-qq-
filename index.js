const express = require('express');
const app = express();
const router = express.Router();
const nodemailer = require('nodemailer');


let mailTransport = nodemailer.createTransport({
    host:'smtp.qq.com',
    secureConnection:true,//使用SSL方式传输
    auth:{
        user:'851788635@qq.com',  //你的邮箱账号
        pass:'qpigmbfyyiaebcdf'   //邮箱密码。qq邮箱是授权码（需要开启邮箱smtp服务）
    }
});


app.get('/send',function (req, res, next) {
    console.log('进来了');
    let options = {
        from : '"小明"<851788635@qq.com>',  //发送人
        to : '"丽丽"<851788635@qq.com>',   //收件人
        //cc : '抄送',
        bcc : '密送',
        subject : '一封来自小明的邮件',  //邮件主题
        text : 'text',
        html : '详情见附件', //邮件主题内容,
        // 下面是发送附件，不需要就注释掉
        attachments : [{   //附件
                filename: '新建 Microsoft Word 文档.docx',
                path: './atta/新建 Microsoft Word 文档.docx'
            },
            {
                filename: 'demo.js',
                path: './atta/demo.js'
            }
        ]
    };
    mailTransport.sendMail(options,function (err, msg) {
        if(err){
            console.log(err);
            res.send('error');
        } else {
            console.log(msg);
            res.send('hello world!');
        }
    })
});

app.listen('8080');