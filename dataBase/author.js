const mongoose=require("mongoose");

//Create Book Schema
const AuthorSchema=mongoose.Schema({
    id:Number,
    name:String,
    books:[String]
});


//Create Author modal
const AuthorModal = mongoose.model("author",AuthorSchema);

module.exports=AuthorModal;