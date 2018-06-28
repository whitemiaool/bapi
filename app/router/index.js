const router = require('koa-router')();
const Paper  = require('../controller/paper');
const Topic  = require('../controller/topic');
const Wx  = require('../controller/wx');
const UTIL   = require('../../util');
const fs     = require('fs')

router.get('/getbar',async(ctx,next)=>{
    ctx.response.body = {
        code:11,
        data:[{title:'首页',url:'/index'},{title:'G记',url:'/index/git'},{title:'DEMO',url:'/index/demo'},{title:'二十四字',url:'/index/loveCCPloveXjp'}]
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

router.post('/addonetopic',Topic.addone)

router.get('/getallpaper',Paper.getallpaper)
router.post('/getonepaper',Paper.getonepaper)

router.post('/delonepaper',Paper.delonepaper)



router.post('/commentpaper',Paper.commentpaper)
router.post('/getpapercom',Paper.getpapercom)
router.post('/starcomment',Paper.starcomment)


router.post('/clickstar',Paper.clickstar)


router.get('/getalltopic',Topic.getalltopic)

router.post('/delonetopic',Topic.delonetopic)




router.get('/getclick',Wx.getclick);

router.get('/saveclick',Wx.saveclick);


// router.post('/saveClick',(ctx,next)=>{
//     n++;
//     clearTimeout(timer);
//     timer = setTimeout(()=>{
//         let data =JSON.parse( fs.readFileSync(db,'utf-8'));          
//         let savedata = JSON.stringify({click:data.click-0+n})
//         fs.writeFileSync(db,savedata);
//         n = 0;
//     },)
//     ctx.body ={code:1,msg:''};
//     next()
// });

module.exports = router