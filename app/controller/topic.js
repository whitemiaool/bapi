const mongoose = require('mongoose');
const Paper    = require('../model/topic');

delone = (db,id)=>{
    return new Promise((res)=>{
        db.remove({'_id':`${id}`},(err)=>{
            res(err)
        })
    })
}

exports.addone = async function(ctx,next) {
    let name = ctx.request.body.content
    if(name.trim()) {
        let paper = new Paper({
            name:name,
        })
        await paper.save()
    }
    ctx.response.body =  {
        code:11,
        msg:''
    }
}

exports.getalltopic = async function(ctx,next) {
    let papers = await Paper.find();
    ctx.response.body = {
        code:11,
        data:papers,
        msg:'success'
    }
}

exports.delonetopic = async function(ctx,next) {
    let id  = ctx.request.body.data;
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

    