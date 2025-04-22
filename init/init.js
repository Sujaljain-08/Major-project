const mongoose=require("mongoose");
const data=require("./data.js");
const listing=require("../models/listing.js");

async function connect() {
    await mongoose.connect('mongodb://127.0.0.1:27017/major_proj');
}

connect().then(()=>{
    console.log("connection successful");
}).catch((err)=>{console.log(err)});
