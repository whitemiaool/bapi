const router = require('koa-router')();
const Paper  = require('../controller/paper');
const Topic  = require('../controller/topic');
const Wx  = require('../controller/wx');
const UTIL   = require('../../util');
const fs     = require('fs')

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

router.post('/addonepaper',Paper.addone)

router.post('/addonetopic',Topic.addone)

router.get('/getallpaper',Paper.getallpaper)

router.post('/delonepaper',Paper.delonepaper)





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