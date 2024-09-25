const mongoose=require("mongoose");


mongoose.connect("mongodb://localhost/JobPortalDB") // last part of this link is the name of our database.
.then((result) => {
    console.log('MongoDB Connected Successfully');
}).catch((err) => {
    console.log(err);
});


const upschema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
});

const scollection= mongoose.model("scollection",upschema); // First param is collection name and 2nd one is schema
module.exports=scollection;