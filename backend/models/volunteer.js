const mongoose=require('mongoose')
const schema=mongoose.Schema
const volunteerModel=new schema({
    Name:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    phone_number:
    {
        type:Number,
        required:true
    },
    age:
    {
        type:Number,
        required:true
    },
    sex:
    {
        type:String,
        required:true
    },
})
module.exports=mongoose.model("volunteer",volunteerModel)