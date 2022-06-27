require("dotenv").config();

const express =require("express");
const mongoose = require("mongoose")

//import dataBase
const dataBase=require("./dataBase");

//modals
const BookModal = require("./dataBase/book");
const AuthorModal = require("./dataBase/author");
const PublicationModal = require("./dataBase/publication");

//initialising express
const booky=express();

//configuration
booky.use(express.json());

//Establish mongoose connection
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("connection astablished!!!"));

/*
ROUTE          /
DESCRIPTION    GET ALL BOOKS DATA
ACCESS         PUBLIC
PARAMETER      NONE
METHOD         GET
*/

booky.get("/",async (req,res)=>{
    const getAllBooks = await BookModal.find();
    return res.json(getAllBooks);
});

/*
ROUTE          /bn
DESCRIPTION    GET ALL BOOKS DATA
ACCESS         PUBLIC
PARAMETER      :isbn
METHOD         GET
*/
booky.get("/bn/:isbn",async(req,res)=>{
    const getSpecificBook= await BookModal.findOne({ISBN:req.params.isbn});
    // const getSpecificBook=dataBase.books.filter((book)=> book.ISBN===req.params.isbn);
    if(!getSpecificBook){
        return res.json({error:`sorry! ${req.params.isbn} is not available`})
    };
    return res.json({book:getSpecificBook});
});

/*
ROUTE          /ln
DESCRIPTION    GET SPECIFIC BOOK DATA BASED ON LANGUAGE 
ACCESS         PUBLIC
PARAMETER      :language
METHOD         GET
*/
booky.get("/ln/:language",async(req,res)=>{
    const getSpecificBook = await BookModal.findOne({language:req.params.language})
    //const getSpecificBook = dataBase.books.filter((book)=>book.language === req.params.language);
    if(!getSpecificBook){
        return res.json({error:`sorry! ${req.params.lang} books are not available`})
    };
    return res.json({books:getSpecificBook});
});

/*
ROUTE          /c/:category
DESCRIPTION    GET SPECIFIC BOOK DATA BASED ON CATEGORY 
ACCESS         PUBLIC
PARAMETER      :category
METHOD         GET
*/

booky.get("/c/:category",async(req,res)=>{
    const getSpecificBook = await BookModal.findOne({category:req.params.category})
    //const getSpecificBook = dataBase.books.filter((book)=> book.category.includes(req.params.category));
    if(!getSpecificBook){
        return res.json({error:`sorry! ${req.params.category} category books are not available`})
    };
    return res.json({books:getSpecificBook});
});

/*
ROUTE          /author
DESCRIPTION    GET ALL AUTHOR'S DATA
ACCESS         PUBLIC
PARAMETER      NONE
METHOD         GET
*/

booky.get("/author",async(req,res)=>{
    return res.json({books: await AuthorModal.find()});
});

/*
ROUTE          /author/id
DESCRIPTION    GET SPECIFIC AUTHOR'S DATA
ACCESS         PUBLIC
PARAMETER      :id
METHOD         GET
*/
booky.get("/author/id/:id",async (req,res)=>{
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

booky.get("/author/book/:isbn", async(req,res)=>{
    const getSpecificAuthor = await AuthorModal.findOne({ISBN:isbn});
    //const getSpecificAuthor = dataBase.author.filter((author)=> author.books.includes(req.params.isbn));
    if(!getSpecificAuthor){
        return res.json({error:`sorry! ${req.params.isbn} author's books are not available`})
    };
    return res.json({Authors:getSpecificAuthor});
});

/*
ROUTE          /PUBLICATION
DESCRIPTION    GET ALL PUBLICATION'S DATA
ACCESS         PUBLIC
PARAMETER      NONE
METHOD         GET
*/

booky.get("/publication",async(req,res)=>{
    return res.json({books:await PublicationModal.find()});
});

/*
ROUTE          /publication/id
DESCRIPTION    GET SPECIFIC PUBLICATION'S DATA
ACCESS         PUBLIC
PARAMETER      :id
METHOD         GET
*/
booky.get("/publication/:id",async(req,res)=>{
    const getSpecificPublication = await PublicationModal.findOne({id:req.params.id})
    //const getSpecificPublication=dataBase.publication.filter((publication)=> publication.id == req.params.id);
    if(!getSpecificPublication){
        return res.json({error:`sorry! ${req.params.id} publication is not available`})
    };
    return res.json({Publications:getSpecificPublication});
});

/*
ROUTE          /publication/book
DESCRIPTION    GET PUBLICATION'S DATA BASED ON BOOKS
ACCESS         PUBLIC
PARAMETER      :isbn
METHOD         GET
*/


booky.get("/publication/book/:isbn",async(req,res)=>{
    const getSpecificPublication = await PublicationModal.findOne({ISBN:req.params.isbn})
    //const getSpecificPublication = dataBase.publication.filter((publication)=> publication.books.includes(req.params.isbn));
    if(!getSpecificPublication){
        return res.json({error:`sorry! ${req.params.isbn} publication's books are not available`})
    };
    return res.json({Publications:getSpecificPublication});
});


//POST METHOD.....

/*
ROUTE          /book/add
DESCRIPTION    POST NEW BOOKS DATA
ACCESS         PUBLIC
PARAMETER      NONE
METHOD         POST
*/

booky.post("/book/add",async(req,res)=>{
    const {newBook} = req.body;
    const addNewBook = await BookModal.create(newBook)
    //dataBase.books.push(newBook);
    return res.json({books:addNewBook});
});
/*
ROUTE          /author/add
DESCRIPTION    POST NEW AUTHOR DATA
ACCESS         PUBLIC
PARAMETER      NONE
METHOD         POST
*/

booky.post("/author/add",async(req,res)=>{
    const {newAuthor} = req.body;
    const addNewAuthor = await AuthorModal.create(newAuthor)
    // dataBase.author.push(newAuthor);
    return res.json({Authors:addNewAuthor});
});
/*
ROUTE          /publication/add
DESCRIPTION    POST NEW PUBLICATION DATA
ACCESS         PUBLIC
PARAMETER      NONE
METHOD         POST
*/

booky.post("/publication/add",async(req,res)=>{
    const {newPublication} = req.body;
    const addNewPublication = await PublicationModal.create(newPublication);
    //dataBase.publication.push(newPublication);
    return res.json({Publications:addNewPublication});
});

//PUT....

/*
ROUTE          /book/update/title
DESCRIPTION    POST NEW PUBLICATION DATA
ACCESS         PUBLIC
PARAMETER      :isbn
METHOD         PUT
*/

booky.put("/book/update/title/:isbn",(req,res)=>{
    dataBase.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn)
        {
            book.title= req.body.newBookTitle;
            return;
        };
    });
    return res.json({books:dataBase.books});
});

/*
ROUTE          /book/update/author
DESCRIPTION    UPDATE BOOK AUTHOR
ACCESS         PUBLIC
PARAMETER      :isbn
METHOD         PUT
*/
booky.put("/book/update/author/:isbn/:authorid",(req,res)=>{
    //update book database
    dataBase.books.forEach((book) => {
        if(book.ISBN== req.params.isbn){
            return book.author.push(parseInt(req.params.authorid))
        }
    });

    //update author database
    dataBase.author.forEach((author)=>{
        if(author.id==req.params.authorid){ 
            return author.books.push(parseInt(req.params.isbn))
        }
    });
    return res.json({books:dataBase.books,author:dataBase.author});
});

/*
ROUTE          /book/update/publication
DESCRIPTION    UPDATE BOOK PUBLICATION
ACCESS         PUBLIC
PARAMETER      :isbn
METHOD         PUT
*/
booky.put(("/book/update/publication/:isbn"),(req,res)=>{
    //update book database
    dataBase.books.filter((book)=>{
        if(book.ISBN==req.params.isbn){
             book.publication = req.body.pubid;
             return;
        }
    });

    //update publications database
    dataBase.publication.filter((publication)=>{
        if(publication.id == req.body.pubid){
            return publication.books.push(req.params.isbn);
        }
    });

    return res.json({books:dataBase.books,publication:dataBase.publication,message:"Successfully updated Publication of book"})
});

//DELETE.......

/*
ROUTE          /book/delete
DESCRIPTION    DELETE BOOKS DATABASED
ACCESS         PUBLIC
PARAMETER      :isbn
METHOD         DELETE
*/

booky.delete(("/book/delete/:isbn"),(req,res)=>{
    const updatedBooksDataBase= dataBase.books.filter(
        (book)=>book.ISBN !== req.params.isbn
    );
    dataBase.books=updatedBooksDataBase;
    return res.json({Books:dataBase.books});
});

/*
ROUTE          /book/author/delete/:isbn/:author
DESCRIPTION    DELETE BOOKS DATABASED
ACCESS         PUBLIC
PARAMETER      :isbn,:authorid
METHOD         DELETE
*/
booky.delete(("/book/author/delete/:isbn/:authorid"),(req,res)=>{
    //delete author from books
    dataBase.books.forEach(
        (book)=>{
            if(book.ISBN===req.params.isbn){
            const newAuthorslist= book.author.filter(
                (author)=>author !==parseInt(req.params.authorid)
            );
            book.author=newAuthorslist;
            return;
        }
        }
        )

    //delete book from author
    dataBase.author.forEach(
        (author)=>{
            if(author.id === parseInt(req.params.authorid)){
            const newBookslist= author.books.filter(
                (book)=> book !==req.params.isbn
            );
            author.books=newBookslist;
            return;
        }
        }
        )
        return res.json({books:dataBase.books,authors:dataBase.author,Message:"Author was deleted"});
});

/*
ROUTE          /book/publication/delete
DESCRIPTION    DELETE PUBLICATIONS FROM BOOKS DATABASED
ACCESS         PUBLIC
PARAMETER      :isbn,:pubId
METHOD         DELETE
*/

booky.delete("/book/publication/delete/:isbn/:pubId",(req,res)=>{
    //Delete publication data fron books
    dataBase.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            book.publication=0;
            return;
        }
    })
    //delete books data from publication
    dataBase.publication.forEach((publication)=>{
        if(publication.id===parseInt(req.params.pubId)){
            newBooksData=publication.books.filter((book)=>
                book!==req.params.isbn
            );
            publication.books=newBooksData;
            return;
        }
    })

    return res.json({
        books:dataBase.books,
        pablications:dataBase.publication,
        Message:"publication successfully deleted"
    })
});

booky.listen("3000",()=>console.log("server is running"));


