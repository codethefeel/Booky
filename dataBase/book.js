const mongoose=require("mongoose");

//Create Book Schema
const BookSchema=mongoose.Schema({
    ISBN:String,
    title:String,
    pubDate:String,
    language:String,
    numPage:Number,
    category:[String],
    publication:[Number],
    author:[Number]
});


//Create Book modal
const BookModal = mongoose.model("Book",BookSchema);

module.exports=BookModal;