const express = require('express')
const router = express.Router();
const fs = require('fs');
const path = require('path')
const PropertySchema = require('../models/property')
const multer  = require('multer');

    const ftpClient = require('ftp-client'),
        config = {
        host: 'serwer141299.lh.pl',
        user: 'serwer141299',
        password: 'Onesta_123_Wroc_!!!',
        },  
        options = {
        logging: 'basic'
        };


        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
            cb(null, './public/images')
            },
            
            filename: function (req, file, cb) {
            const data = new Date().toLocaleDateString();
            const id = req.body.id
            const country = req.body.country
            const region = req.body.region
            const uniqueSuffix = '_'+ data + Date.now()+'___' + data + path.extname(file.originalname)
            // const uniqueImgName = req.body.country + req.body.region + req.body.title + Date.now().toLocaleDateString();
            cb(null, id+'_'+country+'_'+ region+ '-' + uniqueSuffix)
            }
        })

    const upload = multer({ storage: storage })
    
    router.get('/properties', async (req,res) => {
        const AllProperties = await PropertySchema.find({});
        res.render("properties", {properties: AllProperties})
    });

    router.post('/routes/properties', upload.array('PropImages', 30), async function (req,res) {

        console.log(req.body)

        client = new ftpClient(config, options);
        console.log("Try connect to FTP")
        await client.connect(function() {
            console.log("Logged to FTP")
            // const images = req.files
            // console.log(images)
            // let imgName = [];
            // imgName = images.map(img => img.path)
            // console.log(imgName)
            client.upload(['public/images/**'], '/public_html/onestaforms.com.pl/images', {
                baseDir: 'public/images',
                overwrite: 'older'
                }, function (result) {
                  console.log(result);
                });
            });

            const images = req.files
            const preUrlImage = images.map(img => "http://onestaforms.com.pl/images/" + img.filename)
            console.log(preUrlImage)

            const urlImages = preUrlImage

            const obj = {
                image: urlImages
                } 

            console.log(obj)


    const newProperty = new PropertySchema({
        id: req.body.id,
        country: req.body.country,
        region: req.body.region,
        city: req.body.city,
        title: req.body.title,
        market: req.body.market,
        type: req.body.type,
        seaview: req.body.seaview,
        firstline: req.body.firstline,
        bathrooms: req.body.bathrooms,
        bedrooms: req.body.bedrooms,
        pool: req.body.pool,
        garden: req.body.garden,
        parking: req.body.parking,
        solarium: req.body.solarium,
        sauna: req.body.sauna,
        taras: req.body.taras,
        balcony: req.body.balcony,
        price: req.body.price,
        distance: req.body.distance,
        description: req.body.description,
        owner: req.body.owner,
        image: obj.image

    })    
    await newProperty.save();
    res.redirect('newproperty')
    res.send(console.log("Sended to Mongo"))
})


module.exports = router