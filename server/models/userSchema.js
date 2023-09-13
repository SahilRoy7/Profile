const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
    },
    phone: {
        type: String,
        required:true
    },
    work: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    cnfrmpassword: {
        type: String,
        required:true
    },
    date: {
        type: Date,
        default:Date.now
    },
    messages: [
        {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required:true
            },
            phone: {
                type: String,
                required:true
            },
            message: {
                type: String,
                required:true
            }
        }
    ],

    tokens: [
        {
            token:{                                   //it is an array bcoz tokens are created each time the user logs in
                type: String,
                required:true                    
            }
        }
    ]
})



//we are hashing the password

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password, 12);
        this.cnfrmpassword=await bcrypt.hash(this.cnfrmpassword, 12);
    }
    next();                       //user.save is called
})


//we  are generating token
userSchema.methods.generateAuthToken=async function(){
    try{
        let tokennew=jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token : tokennew});
        await this.save();
        return tokennew;
    }catch(err){
        console.log(err);
    }
};

userSchema.methods.addMessage=async function(name, email, phone, message){
    try{
        this.messages=this.messages.concat({name, email, phone, message});
        await this.save();
        return this.messages;
    }catch(error){
        console.log(error)
    }
}

const User=mongoose.model('USER', userSchema);   //connecting schema to the document
module.exports=User;     //exported so that it can be used everywhere