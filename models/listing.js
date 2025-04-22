const mongoose=require("mongoose");

let Schema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        filename:{
            type:String
        },
        url:{
            type:String,
            required:true,
            default:"/route",
            set:(v)=>v===""?"/route":v,
        }    
    },
    price:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    }
});

const Listing= mongoose.model("Listing",Schema);
module.exports=Listing;
