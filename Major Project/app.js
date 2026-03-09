const express=require("express");
const mongoose=require("mongoose");
const ejs=require("ejs");
const path=require("path");
const Listing=require("./models/listing.js");
const methodOverride=require("method-override");
const app=express();
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
const url="mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
})
async function main() {
  await mongoose.connect(url);

}


app.listen(8080,()=>{
    console.log("Server is listening ");

});

app.get("/",(req,res)=>{
res.send("Hi ! i am root ");
});

// index route
app.get("/listings", async (req,res)=>{
    const allListing=await Listing.find({});
    res.render("listings/index.ejs",{allListing});
});

//new route
app.get("/listings/new",async(req,res)=>{
res.render("listings/new.ejs")
});

//show route
app.get("/listings/:id",async(req,res)=>{
let {id}=req.params;
const listing=await Listing.findById(id);
res.render("listings/show.ejs",{listing});
});

//create new listing
app.post("/listings",async(req,res)=>{
    const newListing=new Listing(req.body.listing);
   await newListing.save();
   res.redirect("/listings");
});

// edit
app.get("/listings/:id/edit",async(req,res)=>{
   let {id}=req.params;
   const listing=await Listing.findById(id);
   res.render("listings/edit.ejs",{listing});
})

//update route
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
});

// delete route
app.delete("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})