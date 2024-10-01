const express=require('express')
const router=express.Router()
const event=require('../models/event')
const sendemailnotification=require('../notification')
const user=require('../models/user')
router.post('/addevent',async(req,res,next)=>
{
    const{Name,Date}=req.body
    const newEvent={
        Name:req.body.Name,
        Date:req.body.Date,
    }
    let object
    try
    {
        object=await event.create(newEvent)
    }
    catch(error)
    {
        console.log("error")
    }
    if(object)
    {
        //return res.status(200).send(object)
        let users
        try
        {
            users=await user.find({},'email')
        }
        catch(error)
        {
            console.log(error)
        }
        if(users)
        {
            const emailSubject = 'New Event: ' + req.body.Name;
            const emailMessage = `You are invited to a new event!\n\nEvent Name: ${req.body.Name}\nEvent Date: ${req.body.Date}\n\nClick here to view details: [Event Link]`;
            users.forEach((user) => {
                sendemailnotification(user, emailSubject, emailMessage);
              });
            return res.status(200).send(object)
        }
    }
    else
    {
        return res.status(404).json({message:"couldn't create an event"})
    }
})
module.exports=router