const express=require("express");
const app= express();
const path=require("path");
const mongoose=require("mongoose");
const listing=require("./models/listing");
const methodOverride = require('method-override');
const ejsMate=require("ejs-mate");
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.engine('ejs',ejsMate);
express.static(path.join(__dirname,))

async function connect(){
   await mongoose.connect("mongodb://127.0.0.1:27017/wander_lust");
}

connect().then(()=>{
    console.log("Connection was setup")
})
.catch((err)=>{
    console.log("Error-",err)
})

app.get("/listing",async (req,res)=>{
    console.log("get req");
    let all_listing= await listing.find();
    res.render("listing/index.ejs",{all_listing});

})

app.get("/listing/new",(req,res)=>{
    res.render("listing/new.ejs");
})

app.post("/listing/new",(req,res)=>{
    const stay =new listing(req.body);
    stay.save().then(()=>{
        console.log("saved");
    })
    res.redirect("/listing");
})

app.get("/listing/:id",async(req,res)=>{
    let {id}=req.params;
    const stay=await listing.findById(id);
   res.render("listing/explore.ejs",{stay});
})

app.get("/listing/edit/:id",async(req,res)=>{
    const {id}=req.params;
    let stay=await listing.findById(id);
    res.render("listing/edit.ejs",{stay});

})

app.patch("/listing/edit/:id", async (req, res) => {
    const { id } = req.params;
    await listing.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    res.redirect(`/listing/${id}`);
});

app.delete("/listing/delete/:id",async(req,res)=>{
    let {id}=req.params;
    await listing.findByIdAndDelete(id);
    res.redirect("/listing");
})

app.listen(3000,()=>{
    console.log("Server started");
})



