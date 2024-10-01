const express=require('express')
const router=express.Router()
const user=require('../models/user')
router.post('/sighnup',async(req,res,next)=>
{
    const{Name,email}=req.body
    let User
    try{
        User=await user.findOne({email})
    }
    catch(error)
    {
        console.log("error")
    }
    if(User)
    {
        return res.status(500).json({message:"user exist"})
    }
    else
    {
        const newUser=
        {
            Name:req.body.Name,
            email:req.body.email,
        }
        let object
        try{
            object=await user.create(newUser)
        }
        catch(error)
        {
            console.log(error)
        }
        if(object)
        {
            return res.status(200).send(object)
        }
    }
})
module.exports=router