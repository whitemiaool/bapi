const mongoose =  require('mongoose');
const Paper = require('../model/paper');
const cherrio = require('cheerio');

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
        // img:['{type:String}'],
        // comments:[{name:'asd'}],
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

exports.delonepaper = async function(ctx,next) {
    let id = ctx.request.body.data;
    let err = await delone(Paper,id);
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
    
