const express = require('express');                                                   //as it is part of express
const router = express.Router();
const bcrypt = require('bcryptjs');
require('../db/conn');
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const authenticate=require("../middleware/authenticate"); 
const cookieParser=require("cookie-parser");
router.use(cookieParser());

router.get('/', (req, res) => {
    res.send('Hello world from router')
});


//using promises


//router.post('/register',  (req, res)=>{ 
//    const { name, email, phone, work, password, cnfrmpassword}=req.body;           //it is called in post
//    
//    if(!name || !email || !phone || !work || !password || !cnfrmpassword){
//        return res.status(422).json({error:"Please fill the form properly"});
/*    }
    
    User.findOne({email: email})
    .then((userExist)=>{
        if(userExist){
            return res.status(422).json({error: "Email already exist" });
        }
        const user=new User({ name, email, phone, work, password, cnfrmpassword });
        
        user.save().then(()=>{      
            res.status(201).json({message: "User registered successfully" });
        }).catch((err) => {
            console.error("Error while saving user:", err);
            res.status(500).json({error: "Failed to register"})});
    }).catch(err=>{ console.log(err); });
*/
//console.log(email);
//console.log(name);
//console.log(work);
//res.send("My rergister page");                 //initially cannot get register bcoz it is not a get request
//res.json({message: req.body});
//used to get data to your system entered by user

//}); 

//using async await

router.post('/signup', async (req, res) => {
    const { name, email, phone, work, password, cnfrmpassword } = req.body;           //it is called in post

    if (!name || !email || !phone || !work || !password || !cnfrmpassword) {
        return res.status(422).json({ error: "Please fill the form properly" });
    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "Email already exist" });
        }
        else if (password != cnfrmpassword) {
            return res.status(422).json({ error: "Password are not matching" });
        }
        else {
            const user = new User({ name, email, phone, work, password, cnfrmpassword });

            //hashing password and confirm password here


            await user.save();
            res.status(201).json({ message: "User registered successfully" });
        }


    } catch (err) {
        console.log(err);
    }

});

//login route

router.post('/signin', async (req, res) => {
    //console.log(req.body);
    //res.json({message:"Awesome"});

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the field" })
        }

        const userLogin = await User.findOne({ email: email });
        //console.log(userLogin);    //provides all the data corresponding to the email

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

                const token = await userLogin.generateAuthToken();
                console.log(token);
                
                const cookieOptions={
                    expires: new Date(Date.now() + 25892000000),   //30 days
                    httpOnly: true,
                }


                res.cookie("jwtoken",token, cookieOptions);

            if (!isMatch) {
                res.status(400).json({ Error: "Invalid Credentials pass" });
                
            }
            else
                res.json({ message: "User signed in successfully" });
        }
        else {
            res.status(400).json({ Error: "Invalid Credentials email" });
        }


    } catch (err) {
        console.log(err);
    }

});

router.get('/about', authenticate, (req, res)=>{   //request and response  / represents
    res.send(req.rootUser);
});

router.get('/getData', authenticate, (req, res)=>{
    res.send(req.rootUser);
})

router.post('/contact', authenticate,  async(req, res)=>{   //request and response  / represents
    try{
        const {name, email, phone, message}=req.body;
        if(!name || !email || !phone || !message){
            return res.json({ error: "Please Fill the contact form"})
        }
        const userContact=await User.findOne({_id: req.userID});
        if(userContact){
            const userMessage=await userContact.addMessage(name, email, phone, message);
            await userContact.save();
            res.status(201).json({message : "User Contact Successfully!"});

        }

    }catch(error){
        console.log(error)
    }
});

router.get('/logout', (req, res)=>{   //request and response  / represents
    res.clearCookie('jwtoken', {path:'/'});
    res.status(200).send('User Logout');
});

module.exports = router;