const mongoose =  require('mongoose');
const Paper = require('../model/paper');

let paper = new Paper({
    // topic:{type:ObjectId,ref:'user'},
    title:'String',
    brief:'String',
    content:'String',
    img:['{type:String}'],
    comments:[{name:'asd'}],
    star:22,
    paperid:33,
})

module.exports =async function() {
    let user = await paper.save();
}
    
