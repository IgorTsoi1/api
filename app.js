const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const userRoutes = require('./routes/user')
const testRoutes = require('./routes/test')
const questionRoutes = require('./routes/question')
const answerRoutes = require('./routes/answer')


mongoose.connect("mongodb+srv://Igor:eXIXfDKnrixSNOmM@green-light.0yjhuxu.mongodb.net/?retryWrites=true&w=majority")
//mongodb+srv://Igor:<password>@green-light.0yjhuxu.mongodb.net/?retryWrites=true&w=majority process.env.MONGO_ATLAS_PW


app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req,res,next) =>{
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next();
})

app.use('/user', userRoutes)
app.use('/test', testRoutes)
app.use('/question', questionRoutes)
app.use('/answer', answerRoutes)


app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req,res,next) => {
    res.status(error.status || 500)
    res.json({
      error:{
        message: error.message
      }
    })
})




module.exports = app;