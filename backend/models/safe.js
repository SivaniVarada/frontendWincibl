const mongoose=require('mongoose')
const schema=mongoose.Schema
const safemodel=new schema({
    Name:
    {
        type:String,
        required:true
    },
    latitude:
    {
        type:Number,
        required:true
    },
    longitude:
    {
        type:Number,
        required:true
    },
})
module.exports=mongoose.model("safeplaces",safemodel)