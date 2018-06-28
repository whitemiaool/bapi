exports.getSpeObj = function(obj,arr) {
    let res = []
    for(let i=0;i<obj.length;i++) {
        let rj = {};
        for(let j=0;j<arr.length;j++) {
            rj[arr[j]] = obj[i][arr[j]]
        }
        res[i] = rj;
    }
    return res
}


exports.delone = (db,id)=>{
    return new Promise((res)=>{
        db.remove({'_id':`${id}`},(err)=>{
            res(err)
        })
    })
}

exports.update = (db,o1,o2)=>{
    return new Promise((res)=>{
        db.update(o1,o2,(err,doc)=>{
            res(err)
        })
    })
}

exports.res = function(err,ctx) {
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