const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const logger = require('morgan');
const mongoose = require('mongoose');

//routes
const auth = require('./routes/auth');
const user = require('./routes/user');
const offre = require('./routes/offres')

const app = express();

const port = 3000;


app.set('port',port);

http.createServer(app);

mongoose.connect("mongodb://localhost:27017/jobevent", function(err){
    if (err) {
        console.log(err);
        
        
    }else{
        console.log('connected succesfully to database ');
        
    }
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api/auth', auth);
app.use('/api/users', user);
app.use('/api/offres', offre)

app.listen(port);
