// const mongoose =  require('mongoose');
const Paper = require('../model/paper');
const Com = require('../model/comment');
const Inx = require('../model/paperindex');
const cherrio = require('cheerio');
const util = require('../../util');

delone = (db,id)=>{
    return new Promise((res)=>{
        db.remove({'_id':`${id}`},(err)=>{
            res(err)
        })
    })
}


exports.addone = async function(ctx,next) {
    let b = ctx.request.body;
    let bf = cherrio.load(b.content).text();
    let ind = await Inx.find();
    if(!ind[0]) {
        let ix = new Inx({
            paperindex:100001
        })
        await ix.save();
    }
    ind = await Inx.find();
    await util.update(Inx,{'_id':ind[0]._id},{paperindex:ind[0].paperindex+1});
    bf = bf.slice(0,75);
    if(bf.length > 75) {
        bf = bf+'...'
    }
    // bf = bf+'...'
    let paper = new Paper({
        topic:b.topic,
        title:b.tl,
        brief:bf,
        content:b.content,
        commentL:0,
        paperindex:ind[0].paperindex+1,
        // img:['{type:String}'],
        star:0,
        paperid:0,
    })
    // console.log()
    let err = await paper.save();
    if(err) {
        ctx.response.body = {
            code:01,
            msg:err
        }
    } else {
        ctx.response.body = {
            code:11,
            msg:'success'
        }
    }
}

exports.getallpaper = async function(ctx,next) {
    let res = await Paper.find().populate('topic');
    ctx.response.body = {
        code:11,
        msg:'success',
        data:res
    }
}

exports.getonepaper = async function(ctx) {
    let index = ctx.request.body.index;
    let p = await Paper.find({paperindex:index}).populate('topic');
    if(p[0]) {
        ctx.response.body = {
            code:11,
            msg:'success',
            data:p[0]
        }
    } else {
        ctx.response.body = {
            code:02,
            msg:'nodata',
        }
    }
    // console.log(index)
}

exports.delonepaper = async function(ctx,next) {
    let id = ctx.request.body.data;
    let err = await delone(Paper,id);
    util.res(err,ctx)
}

exports.clickstar = async function(ctx) {
    let id = ctx.request.body.data;
    let star = ctx.request.body.star;
    let err = await util.update(Paper,{'_id':id},{star:star+1});
    util.res(err,ctx)
}


exports.commentpaper = async function(ctx) {
    let id = ctx.request.body.id;
    let com = ctx.request.body.comm;
    let pa = await Com.find({'paperid':id});
    let cs = pa[0]&&pa[0].comments||[];
    let zz = {
        name:'小明',
        content:com,
        star:0,
        date:Date.now()
    }
    cs.push(zz);
    await util.update(Paper,{'_id':id},{commentL:cs.length});
    if(!pa[0]) {
        let cm = new Com({
            paperid:id,
            comments:cs,
            date:Date.now()
        })
        let err = await cm.save();
        ctx.response.body = {
            code:11,
            msg:'success',
            data:cs
        }
        return
    } else {
        let err = await util.update(Com,{'paperid':id},{comments:cs});
        if(err) {
            ctx.response.body = {
                code:01,
                msg:err
            }
        } else {
            ctx.response.body = {
                code:11,
                msg:'success',
                data:cs
            }
        }
    }
}

exports.getpapercom = async function(ctx) {
    let id = ctx.request.body.id;
    let page = ctx.request.body.page;
    let pa = await Com.find({'paperid':id});
    if(pa[0]) {
        let res = pa[0].comments.slice(page*10-10,page*10);
        res = res.sort((a,b)=>{
            return b.star - a.star
        })
        ctx.response.body = {
            code:11,
            msg:'success',
            data:res
        }
    } else {
        ctx.response.body = {
            code:11,
            msg:'success',
            data:pa[0]
        }
    }
}


exports.starcomment = async function(ctx) {
    let id = ctx.request.body.id;
    let cid = ctx.request.body.cid;
    let pa = await Com.find({'paperid':id});
    let cm = pa[0].comments;
    for(let i=0;i<cm.length;i++) {
        // cm[i].star = 0;
        if(cm[i]._id == cid) {
            cm[i].star = cm[i].star +1
        }
    }
    // console.log(pa[0]._id)
    // let star = pa[0].star||0
    let err = await util.update(Com,{'_id':pa[0]._id},{comments:JSON.parse(JSON.stringify(cm))});
    util.res(err,ctx);
}