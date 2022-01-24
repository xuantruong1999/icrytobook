require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const homeRoute = require('./routes/homeRoute');
const path = require('path');
const bodyParser = require('body-parser');

//setting view mapping with the template engine pug
app.set("views", path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//apply middlewares
app.use(morgan("combined"));
app.use(cors());

//setting static files system
app.use(express.static('public'));

//body parser request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect to mongoDB with mongoose
mongoose.connect(process.env.CONNECTION_URL).then(() =>{
    console.log("Connect to mongoDB successfully");
}).catch(err => console.log(err));    

//Routers
app.use('/', homeRoute);

//declaring port
const port = process.env.PORT || 8088;

//Running app!
app.listen(port, () => {
    console.log(`Server is starting on port ${port}`)
});

