const mongoose = require("mongoose");



const DB = "mongodb+srv://MuskanV:<password>@cluster0.lqpxk72.mongodb.net/<DB_name>?retryWrites=true&w=majority";

mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log("connection start")).catch((error)=>{
    console.log(error);
})
