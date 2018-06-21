const mongoose =  require('mongoose');
const Paper = require('../model/paper');



exports.addone = function() {
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
}
    
