const mongoose=require("mongoose");

//Create publication Schema

const PublicationSchema = mongoose.Schema({
    id:Number,
    name:String,
    books:[String]
});

//Create publication Modal

const PublicationModal = mongoose.model("publication",PublicationSchema);

module.exports=PublicationModal;