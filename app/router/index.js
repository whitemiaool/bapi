const router = require('koa-router')();
const Paper = require('../controller/paper');
const Topic = require('../controller/topic');

router.get('/getbar',async(ctx,next)=>{
    ctx.response.body = {
        code:11,
        data:[{title:'首页',url:'/'},{title:'G记',url:'/git'},{title:'DEMO',url:'/demo'},{title:'二十四字',url:'/loveCCPloveXjp'}]
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
router.get('/mon',async(ctx,next)=>{
    mon();
})

router.post('/addonepaper',async(ctx,next)=>{
    console.log(ctx.request.body);
})

router.post('/addonetopic',Topic.addone)

module.exports = router