const mongoose=require('mongoose')
const schema=mongoose.Schema
const UserModel=new schema({
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
})
module.exports=mongoose.model("user",UserModel)