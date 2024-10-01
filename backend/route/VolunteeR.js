const express=require('express')
const router=express.Router()
const volunteer=require('../models/volunteer')
const sendemailnotification=require('../notification')
router.post('/add',async(req,res,next)=>
{
    const{Name,email,phone_number,age,sex}=req.body
    const newVolunteer={
        Name:Name,
        email:email,
        phone_number:phone_number,
        age:age,
        sex:sex,
    }
    let object
    try
    {
        object=await volunteer.create(newVolunteer)
    }
    catch(error)
    {
        console.log(error)
    }
    if(object)
    {
        const emailSubject = req.body.Name;
        const emailMessage = `${req.body.Name} You are now a member of this esteemed volunteer club`
        sendemailnotification(email, emailSubject, emailMessage);
            
    }
})
module.exports=router