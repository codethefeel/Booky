const mongoose=require("mongoose");

//Create Book Schema
const BookSchema=mongoose.Schema({
    id:Number,
    name:String,
    books:[String]
});


//Create Author modal
const AuthorModal = mongoose.model(AuthorSchema);

module.exports(AuthorModal);