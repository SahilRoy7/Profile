const mongoose=require('mongoose');
const DB=process.env.DATABASE;

mongoose.connect(DB).then(()=>{                      // second argument is to remove depreciation warning
    console.log(`Connection Successful`);
}).catch((err)=>console.log(`no connection`));                  // then-> promises means onece promise is done it has two outputs either connection is done or not done
