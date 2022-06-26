const express =require("express");

//import dataBase
const dataBase=require("./dataBase");

//initialising express
const booky=express();

//configuration
booky.use(express.json());

/*
ROUTE          /
DESCRIPTION    GET ALL BOOKS DATA
ACCESS         PUBLIC
PARAMETER      NONE
METHOD         GET
*/

booky.get("/",(req,res)=>{
    return res.json({books:dataBase.books});
});

/*
ROUTE          /bn
DESCRIPTION    GET ALL BOOKS DATA
ACCESS         PUBLIC
PARAMETER      :isbn
METHOD         GET
*/
booky.get("/bn/:isbn",(req,res)=>{
    const getSpecificBook=dataBase.books.filter((book)=> book.ISBN===req.params.isbn);
    if(getSpecificBook.length === 0){
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
booky.get("/ln/:language",(req,res)=>{
    const getSpecificBook = dataBase.books.filter((book)=>book.language === req.params.language);
    if(getSpecificBook.length === 0){
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

booky.get("/c/:category",(req,res)=>{
    const getSpecificBook = dataBase.books.filter((book)=> book.category.includes(req.params.category));
    if(getSpecificBook.length === 0){
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

booky.get("/author",(req,res)=>{
    return res.json({books:dataBase.author});
});

/*
ROUTE          /author/id
DESCRIPTION    GET SPECIFIC AUTHOR'S DATA
ACCESS         PUBLIC
PARAMETER      :id
METHOD         GET
*/
booky.get("/author/id/:id",(req,res)=>{
    const getSpecificAuthor=dataBase.author.filter((author)=> author.id == req.params.id);
    if(getSpecificAuthor.length === 0){
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

booky.get("/author/book/:isbn",(req,res)=>{
    const getSpecificAuthor = dataBase.author.filter((author)=> author.books.includes(req.params.isbn));
    if(getSpecificAuthor.length === 0){
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

booky.get("/publication",(req,res)=>{
    return res.json({books:dataBase.publication});
});

/*
ROUTE          /publication/id
DESCRIPTION    GET SPECIFIC PUBLICATION'S DATA
ACCESS         PUBLIC
PARAMETER      :id
METHOD         GET
*/
booky.get("/publication/:id",(req,res)=>{
    const getSpecificPublication=dataBase.publication.filter((publication)=> publication.id == req.params.id);
    if(getSpecificPublication.length === 0){
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


booky.get("/publication/book/:isbn",(req,res)=>{
    const getSpecificPublication = dataBase.publication.filter((publication)=> publication.books.includes(req.params.isbn));
    if(getSpecificPublication.length === 0){
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

booky.post("/book/add",(req,res)=>{
    const {newBook} = req.body;
    dataBase.books.push(newBook);
    return res.json({books:dataBase.books});
});
/*
ROUTE          /author/add
DESCRIPTION    POST NEW AUTHOR DATA
ACCESS         PUBLIC
PARAMETER      NONE
METHOD         POST
*/

booky.post("/author/add",(req,res)=>{
    const {newAuthor} = req.body;
    dataBase.author.push(newAuthor);
    return res.json({Authors:dataBase.author});
});
/*
ROUTE          /publication/add
DESCRIPTION    POST NEW PUBLICATION DATA
ACCESS         PUBLIC
PARAMETER      NONE
METHOD         POST
*/

booky.post("/publication/add",(req,res)=>{
    const {newPublication} = req.body;
    dataBase.publication.push(newPublication);
    return res.json({Publications:dataBase.publication});
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