// require('babel-register');
const Koa    = require('koa');
const app    = new Koa();
const router = require('koa-router')();
const cors   = require('koa2-cors');
const req    = require('request');

const API    = require('./api');
const UTIL   = require('./util');
const fs     = require('fs');

function get(url) {
    return new Promise((resolve)=>{
        req({
            url:url,
            headers:{
                'User-Agent':`whitemiaool`,
                'OAUTH-TOKEN':'123e9fd6246fa0ec3bce06571091dcafc050a2cc' 
            }
        },(err,res,body)=>{
            console.log(body)
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
app
  .use(router.routes())
  .use(router.allowedMethods());

router.get('/getbar',async(ctx,next)=>{
    ctx.response.body = {
        code:11,
        data:[{title:'G记',url:'/git'},{title:'DEMO',url:'/demo'},{title:'二十四字',url:'/loveCCPloveXjp'}]
    }
});
router.get('/githubrep',async(ctx,next)=>{
    // let res = await get(API.git.getrepo);
    // fs.writeFileSync('./db.txt',JSON.stringify(UTIL.getSpeObj(JSON.parse(res),['name','html_url','description','url','stargazers_count','language'])));
    let res = fs.readFileSync('./db.txt');
    ctx.response.body = {
        code:11,
        data:UTIL.getSpeObj(JSON.parse(res),['name','html_url','description','url','stargazers_count','language'])
    }
})


app.listen(3000);


