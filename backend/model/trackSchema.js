const {  trackdb } = require('./database');
const mongoose = require('mongoose');


const trackSchema =  mongoose.Schema({
    userId:{
        type:String
    },
    // role: {
    //     type:String,
    // },
    space: [{
        spaceId: String,
        role:{
            type : String,
            required : true,
            enum: ["owner","contributor","client"]
        }
    }],
    taskAssigned: [{
        taskId: String,
    }]
        
})

module.exports.tdb = trackdb.model("tracks",trackSchema)

