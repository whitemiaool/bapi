exports.getSpeObj = function(obj,arr) {
    let res = []
    for(let i=0;i<obj.length;i++) {
        let rj = {};
        for(let j=0;j<arr.length;j++) {
            rj[arr[j]] = obj[i][arr[j]]
        }
        res[i] = rj;
    }
    console.log(res)
    return res
}