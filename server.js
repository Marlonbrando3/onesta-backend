const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const propertiesRouter = require('./routes/properties')
const mainpageRouter = require('./routes/mainpage')
const newpropertyRouter = require('./routes/newproperty')
// const connectFtpRouter = require('./routes/ftp')

require('dotenv/config');
const app = express();
app.use(cors({
  origin:['http://localhost:3000'],
  credentials:true
}))


app.use(express.json());
app.use(express.urlencoded({extended: false}))

mongoose.connect(process.env.MONGODB_URI,
{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>console.log("Connected with MongoDB"))
.catch((err) => console.log(err))


app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')

app.use(propertiesRouter);
app.use(mainpageRouter);
app.use(newpropertyRouter);
// app.use(connectFtpRouter);


app.listen(3001, () => {
    console.log("Server is running at port 3001");
  });

