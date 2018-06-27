// require('babel-register');
const Koa    = require('koa');
const logger = require('koa-logger')
const app    = new Koa();

const cors   = require('koa2-cors');
const req    = require('request');
const bodyParser = require('koa-bodyparser');

const API    = require('./api');
const fs     = require('fs');
const mon = require('./app/controller/paper')

const mongoose = require('mongoose')

const db = 'mongodb://118.24.13.151:28010/blog'


mongoose.Promise = require('bluebird')
mongoose.connect(db)

function get(url) {
    return new Promise((resolve)=>{
        req({
            url:url,
            headers:{
                'User-Agent':`whitemiaool`,
                'OAUTH-TOKEN':'123e9fd6246fa0ec3bce06571091dcafc050a2cc' 
            }
        },(err,res,body)=>{
            if(!err) {
                resolve(body)
                // ctx.response.body = {
                //     code:1,
                //     // data:UTIL.getSpeObj(body,[''])
                //     data:''
                // }
            }
        })
    })
}

app.use(logger())
app.use(bodyParser({
    enableTypes:['json', 'form', 'text']
  }))
app.use(cors({
    origin: function (ctx) {
        // if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        // }
        // return '//localhost:8080'; / 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

let router = require('./app/router')
app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(3000);
