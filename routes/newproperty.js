const express = require('express');
const { now } = require('mongoose');
const Property = require('../models/property')
const router = express.Router();
const PropertySchema = require('../models/property')

router.get('/newproperty', async (req,res) => {

        let randomNumberIdFull;
        let randomNumberIdString;
        let randomNumberId;

    const Props = await Property.find({});
    console.log(Props.length)
    
    if(Property.length === 0){
       randomNumberIdFull = Math.random() * Date.now(); 
        randomNumberIdString = randomNumberIdFull.toString();
        randomNumberId = randomNumberIdString.slice(0,6)

    } else {
    const PropsId = Props.map(id=> id.id)
    console.log(PropsId);
    randomNumberIdFull = Math.random() * Date.now(); 
    randomNumberIdString = randomNumberIdFull.toString();
    randomNumberId = randomNumberIdString.slice(0,6)

    console.log(randomNumberId);

    PropsId.map(id=>{
        if(id.id === randomNumberId) {
            let randomNumberIdFull = Math.random() * Date.now(); 
            let randomNumberIdString = randomNumberIdFull.toString();
            let randomNumberId = randomNumberIdString.slice(0,6)
            console.log(randomNumberId)
        }
        return randomNumberId

    })}
    res.render("newproperty", {id: randomNumberId})
});

module.exports = router