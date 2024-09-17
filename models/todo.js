const mongoose = require('mongoose')

const TodoSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:[true,"must be provided"],
        trim:true,
        maxLength:[20,"name must be at more than 20 characters"]
    },
    completed:{
        type:Boolean,
        default:false
    }
})


module.exports = mongoose.model('Todo',TodoSchema)