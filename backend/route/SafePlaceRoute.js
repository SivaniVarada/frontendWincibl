const express=require('express')
const router=express.Router()
const safeplaces=require('../models/safe')
const axios=require('axios')
const geolib=require('geolib')
const geolocation = require('geolocation-utils');
router.post('/add',async(req,res,next)=>
{
    const safe=new safeplaces({
        Name:req.body.Name,
        latitude:req.body.latitude,
        longitude:req.body.longitude
    })
    let object
    try
    {
        object=await safeplaces.create(safe)
    }
    catch(error)
    {
        console.log(error)
    }
    if(object)
    {
        return res.status(200).json({object})
    }
    return res.status(500).json({message:"couldn't add the place"})
})
router.delete('/delete/:name',async(req,res,next)=>
{
    const{name}=req.params
    try
    {
        const object=await safeplaces.findOneAndDelete({name})
    }
    catch(error)
    {
        console.log(error)
    }
    if(!object)
    {
        return res.status(500).json({message:"couldn't delete the requested place"})
    }
    return res.status(200).json({message:"successfully deleted"})

})
router.get('/help', async (req, res) => {
  const { latitude, longitude } = req.query;
  console.log(latitude)

  try {
    const allSafePlaces = await safeplaces.find({});
    const radius = 5000; // 5km radius

    const nearbySafePlaces = allSafePlaces.filter(place => {
      return geolib.isPointWithinRadius(
        { latitude: place.latitude, longitude: place.longitude },
        { latitude, longitude },
        radius
      );
    });
    console.log(nearbySafePlaces)

    res.status(200).json({ userLocation: { latitude, longitude }, nearbySafePlaces });
  } catch (error) {
    console.error('Error fetching safe places:', error);
    res.status(500).json({ message: 'An error occurred while fetching safe places.' });
  }
});
  module.exports=router
  