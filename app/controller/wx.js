const Wx    = require('../model/wx');

delone = (db,id)=>{
    return new Promise((res)=>{
        db.remove({'_id':`${id}`},(err)=>{
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
            times:10,
        })
        await paper.save();
        ctx.response.body = {
            code:11,
            data:10,
            msg:'success'
        }
    }
}

    