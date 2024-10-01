const mongoose=require('mongoose')
const schema=mongoose.Schema
const Eventmodel=new schema({
    Name:
    {
        type:String,
        required:true
    },
    Date:
    {
        type:String,
        required:true
    },
})
module.exports=mongoose.model("event",Eventmodel)