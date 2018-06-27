const Wx    = require('../model/wx');

delone = (db,id)=>{
    return new Promise((res)=>{
        db.remove({'_id':`${id}`},(err)=>{
            res(err)
        })
    })
}

update = (db,o1,o2)=>{
    return new Promise((res)=>{
        db.update(o1,o2,(err,doc)=>{
            res(err)
        })
    })
}

// exports.addone = async function(ctx,next) {
//     let name = ctx.request.body.content
//     if(name.trim()) {
//         let paper = new Paper({
//             name:name,
//         })
//         await paper.save()
//     }
//     ctx.response.body =  {
//         code:11,
//         msg:''
//     }
// }

exports.getclick = async function(ctx,next) {
    let papers = await Wx.find();
    if(papers[0]) {
        ctx.response.body = {
            code:11,
            data:papers[0].times,
            msg:'success'
        }
    } else {
        let paper = new Wx({
            times:0,
        })
        await paper.save();
        ctx.response.body = {
            code:11,
            data:0,
            msg:'success'
        }
    }
}

exports.saveclick = async function(ctx,next){
    let papers = await Wx.find();
    let res = await update(Wx,{'_id':papers[0]._id},{ times: papers[0].times+1 })
    if(res) {
        ctx.response.body = {
            code:01,
            msg:res
        }
    } else {
        ctx.response.body = {
            code:11,
            data:papers[0].times+1,
            msg:'success'
        }
    }
};

    