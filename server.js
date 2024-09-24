const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config');

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

// Initializing the app
const app = express();

// connecting the database
//let mongodb_url = 'mongodb://localhost:27017/';
let mongodb_url = 'mongodb+srv://nelsonmbui88:CdL9MxmwCbrTeEEj@devopscluster.kfxuj.mongodb.net/?retryWrites=true&w=majority&appName=DevopsCluster';
let dbName = 'darkroom';
mongoose.connect(`${mongodb_url}${dbName}`,{ useNewUrlParser: true , useUnifiedTopology: true }, (err)=>{
    if (err) console.log(err)
});

// test if the database has connected successfully
// let db = mongoose.connection;
// db.once('open', ()=>{
//     console.log('Database connected successfully')
// })




// View Engine
app.set('view engine', 'ejs');

// Set up the public folder;
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(express.json())


app.use('/', index);
app.use('/image', image);



 
const PORT = process.env.PORT || 5000;
app.listen(PORT,() =>{
    //console.log(`Server is listening at http://localhost:${PORT}`)
    console.log(`Server is listening at http://192.168.3.114:${PORT}`)
});

module.exports = app