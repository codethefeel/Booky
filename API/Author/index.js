//Prifix:/author

//initialising Express

const Router= require("express").Router();

//importing modal

const AuthorModal=require("../../dataBase/author");

/*
ROUTE          /author
DESCRIPTION    GET ALL AUTHOR'S DATA
ACCESS         PUBLIC
PARAMETER      NONE
METHOD         GET
*/

Router.get("/",async(req,res)=>{
    return res.json({books: await AuthorModal.find()});
});

/*
ROUTE          /author/id
DESCRIPTION    GET SPECIFIC AUTHOR'S DATA
ACCESS         PUBLIC
PARAMETER      :id
METHOD         GET
*/
Router.get("/id/:id",async (req,res)=>{
    const getSpecificAuthor = await AuthorModal.findOne({id:id})
    // const getSpecificAuthor=dataBase.author.filter((author)=> author.id == req.params.id);
    if(!getSpecificAuthor){
        return res.json({error:`sorry! ${req.params.id} author is not available`})
    };
    return res.json({Author:getSpecificAuthor});
});

/*
ROUTE          /author/book
DESCRIPTION    GET AUTHOR'S DATA BASED ON BOOKS
ACCESS         PUBLIC
PARAMETER      :isbn
METHOD         GET
*/

Router.get("/book/:isbn", async(req,res)=>{
    const getSpecificAuthor = await AuthorModal.findOne({ISBN:isbn});
    //const getSpecificAuthor = dataBase.author.filter((author)=> author.books.includes(req.params.isbn));
    if(!getSpecificAuthor){
        return res.json({error:`sorry! ${req.params.isbn} author's books are not available`})
    };
    return res.json({Authors:getSpecificAuthor});
});

/*
ROUTE          /author/add
DESCRIPTION    POST NEW AUTHOR DATA
ACCESS         PUBLIC
PARAMETER      NONE
METHOD         POST
*/

Router.post("/add",async(req,res)=>{
    const {newAuthor} = req.body;
    const addNewAuthor = await AuthorModal.create(newAuthor)
    // dataBase.author.push(newAuthor);
    return res.json({Authors:addNewAuthor});
});

module.exports=Router;