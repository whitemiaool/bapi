const mongoose =  require('mongoose');
const Paper = require('../model/topic');

exports.addone = async function(ctx,next) {
    let name = ctx.request.body.content
    console.log(name)
    let paper = new Paper({
        // topic:{type:ObjectId,ref:'user'},
        name:name,
    })
    await paper.save()
}

exports.getalltopic = async function(ctx,next) {
    let name = ctx.request.body.content
    console.log(name)
    let paper = new Paper({
        // topic:{type:ObjectId,ref:'user'},
        name:name,
    })
    await paper.save()
}
    