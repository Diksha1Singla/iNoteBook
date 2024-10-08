const mongoose = require("mongoose");

const NotesSchema = new Schema({
    tilte:{
        type : String,
        required:true
    },
    description:{
        type : String,
        required:true
    },
    tag:{
        type : String,
        default:"General"
    },
    date:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model("note",NotesSchema)