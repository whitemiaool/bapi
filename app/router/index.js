const router = require('koa-router')();
const Paper  = require('../controller/paper');
const Topic  = require('../controller/topic');
const Wx  = require('../controller/wx');
const NavPage  = require('../controller/navpage');

const UTIL   = require('../../util');
const fs     = require('fs');
const axios = require('axios');

router.get('/getbar',async(ctx,next)=>{
    ctx.response.body = {
        // {title:'DEMO',url:'/index/demo'}
        code:11,
        data:[{title:'首页',url:'/index'},{title:'悳馍',url:'/index/dermo'},{title:'开源',url:'/index/git'},{title:'二十四字',url:'/index/loveCCPloveXjp'}]
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

router.post('/addonepaper',Paper.addone)
router.post('/updatepaper',Paper.updatepaper)

router.post('/addonetopic',Topic.addone)

router.post('/getallpaper',Paper.getallpaper)
router.post('/getonepaper',Paper.getonepaper)

router.post('/delonepaper',Paper.delonepaper)
router.post('/getpact',Paper.getpact)



router.post('/commentpaper',Paper.commentpaper)
router.post('/getpapercom',Paper.getpapercom)
router.post('/starcomment',Paper.starcomment)


router.post('/clickstar',Paper.clickstar)


router.get('/getalltopic',Topic.getalltopic)

router.post('/delonetopic',Topic.delonetopic)

router.post('/xiaobing',async (ctx,next)=>{
    let q = ctx.request.body.q;
    let res = await axios.get(`https://www.bing.com/socialagent/chat?q=${encodeURI(q)}&anid=1712151`);
    ctx.response.body = {
        code:11,
        data:res.data
    }
})




router.get('/getclick',Wx.getclick);

router.get('/saveclick',Wx.saveclick);

router.get('/demo',async (ctx,next)=>{
    ctx.response.body = {
        // {title:'DEMO',url:'/index/demo'}
        code:11,
        data:[{title:'React滚动',url:'/demo/onlyscroll',breif:'一款极轻量级的react滚动插件'},
        {title:'如何解决史诗级BUG',breif:'快速解决BUG的一种解决方案',url:'/demo/how2s?q=记乎--一个记不住的网站'}]
    }
})


router.get('/getweather',NavPage.getWeather)
module.exports = router