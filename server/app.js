const dotenv = require('dotenv');
const mongoose=require('mongoose');
const express = require('express');
const cors=require('cors');


const app=express();          //express methods enter into app we can use it with app and connect with express
app.use(cors());
dotenv.config({path:'./config.env'});

//database connection
require('./db/conn');
//const User=require('./model/userSchema');            user from userschema is imported
const PORT=process.env.PORT;

app.use(express.json());       //our application does not understand json type hence if any data comes as express json then convert it to object and show us.

app.use(require('./router/auth'));          //router files are linked for easy routing    //this leads to ignore of home  written below.


//middleware
//const middleware=(req, res, next)=>{
//    console.log(`Hello my middleware`);
//   next();            //ensures pending stage is finished and root is reached after the completion of in between work
//}                //make sure that user has logged in properly or not


//app.get('/', (req, res)=>{   //request and response  / represents file name or root 
//    res.send(`Helloworld from this server`);           //runs after middleware
//});
//listen to the server


//app.get('/about', (req, res)=>{   //request and response  / represents
//    res.send(`Hello about world from this server`);
//});
//app.get('/contact', (req, res)=>{   //request and response  / represents
    //res.cookie("Test", 'thapa');
//    res.send(`Hello contact world from this server`);
//});

app.get('/signup', (req, res)=>{   //request and response  / represents
    res.send(`Hello registration world from this server`);
});

app.get('/signin', (req, res)=>{   //request and response  / represents
    res.send(`Hello  login world from this server`);
});
//C:\Program Files\MongoDB\Server\6.0\bin\
//C:\Program Files\MongoDB\Server\6.0\log\
//mongodb+srv://sahilroy:<password>@cluster0.bnkovol.mongodb.net/?retryWrites=true&w=majority

app.listen(PORT, ()=>{           //3000 port number-> if reaches to particular port then only show helloworld msg
    console.log(`server is running at port number: ${PORT}`);
});