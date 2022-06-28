//prifix:/book

//initialising Express
const Router=require("express").Router();

//importing bookmodal

const BookModal=require("../../dataBase/book");

/*
ROUTE          /
DESCRIPTION    GET ALL BOOKS DATA
ACCESS         PUBLIC
PARAMETER      NONE
METHOD         GET
*/

Router.get("/",async (req,res)=>{
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
Router.get("/bn/:isbn",async(req,res)=>{
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
Router.get("/ln/:language",async(req,res)=>{
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

Router.get("/c/:category",async(req,res)=>{
    const getSpecificBook = await BookModal.findOne({category:req.params.category})
    //const getSpecificBook = dataBase.books.filter((book)=> book.category.includes(req.params.category));
    if(!getSpecificBook){
        return res.json({error:`sorry! ${req.params.category} category books are not available`})
    };
    return res.json({books:getSpecificBook});
});

/*
ROUTE          /book/add
DESCRIPTION    POST NEW BOOKS DATA
ACCESS         PUBLIC
PARAMETER      NONE
METHOD         POST
*/

Router.post("/add",async(req,res)=>{
    const {newBook} = req.body;
    const addNewBook = await BookModal.create(newBook)
    //dataBase.books.push(newBook);
    return res.json({books:addNewBook});
});

//PUT....

/*
ROUTE          /book/update/title
DESCRIPTION    POST NEW PUBLICATION DATA
ACCESS         PUBLIC
PARAMETER      :isbn
METHOD         PUT
*/

Router.put("/update/title/:isbn",async(req,res)=>{
    const updatedBookData= await BookModal.findOneAndUpdate({
        ISBN:req.params.isbn,
    },
    {
        title:req.body.title,
    },
    {
        new: true,
    }
    );


    // dataBase.books.forEach((book)=>{
    //     if(book.ISBN===req.params.isbn)
    //     {
    //         book.title= req.body.newBookTitle;
    //         return;
    //     };
    // });
    return res.json({books:updatedBookData});
});

/*
ROUTE          /book/update/author
DESCRIPTION    UPDATE BOOK AUTHOR
ACCESS         PUBLIC
PARAMETER      :isbn
METHOD         PUT
*/
Router.put("/update/author/:isbn/:authorid",async(req,res)=>{
    //update book database
    const updatedBookData= await BookModal.findOneAndUpdate({
        ISBN:req.params.isbn, 
    },
    {
        $addToSet:{
            author:parseInt(req.params.authorid),
        }
    },
    {
        new:true,
    });

    // dataBase.books.forEach((book) => {
    //     if(book.ISBN== req.params.isbn){
    //         return book.author.push(parseInt(req.params.authorid))
    //     }
    // });

    //update author database
    const updatedAuthorData= await AuthorModal.findOneAndUpdate({
        id:parseInt(req.params.authorid),
    },
    {
        $push:{
            books:req.params.isbn,
        }
    },
    {
        new:true,
    })
    // dataBase.author.forEach((author)=>{
    //     if(author.id==req.params.authorid){ 
    //         return author.books.push(parseInt(req.params.isbn))
    //     }
    // });
    return res.json({books:updatedBookData,author:updatedAuthorData});
});

/*
ROUTE          /book/update/publication
DESCRIPTION    UPDATE BOOK PUBLICATION
ACCESS         PUBLIC
PARAMETER      :isbn
METHOD         PUT
*/
Router.put(("/update/publication/:isbn"),async(req,res)=>{
    //update book database
    const updatedBookData= await BookModal.findOneAndUpdate({
        ISBN:req.params.isbn, 
    },
    {
        $addToSet:{
            pablications:req.body.pubId,
        }
    },
    {
        new:true,
    });

    // dataBase.books.filter((book)=>{
    //     if(book.ISBN==req.params.isbn){
    //          book.publication = req.body.pubid;
    //          return;
    //     }
    // });

    //update publications database
    const updatedPublicationData= await PublicationModal.findOneAndUpdate({
        id:req.body.pubId,
    },
    {
        $push:{
            books:req.params.isbn,
        }
    },
    {
        new:true,
    })
    // dataBase.publication.filter((publication)=>{
    //     if(publication.id == req.body.pubid){
    //         return publication.books.push(req.params.isbn);
    //     }
    // });

    return res.json({books:updatedBookData,publication:updatedPublicationData,message:"Successfully updated Publication of book"})
});

//DELETE.......

/*
ROUTE          /book/delete
DESCRIPTION    DELETE BOOKS DATABASED
ACCESS         PUBLIC
PARAMETER      :isbn
METHOD         DELETE
*/

Router.delete(("/delete/:isbn"),async(req,res)=>{
    const updatedBookData = await BookModal.findOneAndDelete(
        {
            ISBN:req.params.isbn,
        }
    );

    // const updatedBooksDataBase= dataBase.books.filter(
    //     (book)=>book.ISBN !== req.params.isbn
    // );
    // dataBase.books=updatedBooksDataBase;
    return res.json({Books:updatedBookData});
});

/*
ROUTE          /book/author/delete/:isbn/:author
DESCRIPTION    DELETE BOOKS DATABASED
ACCESS         PUBLIC
PARAMETER      :isbn,:authorid
METHOD         DELETE
*/
Router.delete(("/author/delete/:isbn/:authorid"),async(req,res)=>{
    //delete author from books
    const updatedBookData= await BookModal.findOneAndUpdate(
        {
            ISBN:req.params.isbn,
        },
        {
            $pull:{
                author:parseInt(req.params.authorid)
            }
        },
        {
            new:true,
        }
    )

    // dataBase.books.forEach(
    //     (book)=>{
    //         if(book.ISBN===req.params.isbn){
    //         const newAuthorslist= book.author.filter(
    //             (author)=>author !==parseInt(req.params.authorid)
    //         );
    //         book.author=newAuthorslist;
    //         return;
    //     }
    //     }
    //     )

    //delete book from author
    const updatedAuthorData= await AuthorModal.findOneAndUpdate(
        {
            id:parseInt(req.params.authorid),
        },
        {
            $pull:{
                books:req.params.isbn
            }
        },
        {
            new:true,
        }
    )
    // dataBase.author.forEach(
    //     (author)=>{
    //         if(author.id === parseInt(req.params.authorid)){
    //         const newBookslist= author.books.filter(
    //             (book)=> book !==req.params.isbn
    //         );
    //         author.books=newBookslist;
    //         return;
    //     }
    //     }
    //     )
        return res.json({books:updatedBookData,authors:updatedAuthorData,Message:"Author was deleted"});
});

/*
ROUTE          /book/publication/delete
DESCRIPTION    DELETE PUBLICATIONS FROM BOOKS DATABASED
ACCESS         PUBLIC
PARAMETER      :isbn,:pubId
METHOD         DELETE
*/

Router.delete("/publication/delete/:isbn/:pubId",async(req,res)=>{
    //Delete publication data fron books
    const updatedBookData= await BookModal.findOneAndUpdate(
        {
            ISBN:req.params.isbn,
        },
        {
            $pull:{
                publication:parseInt(req.params.pubId)
            }
        },
        {
            new:true,
        }
    )
    // dataBase.books.forEach((book)=>{
    //     if(book.ISBN===req.params.isbn){
    //         book.publication=0;
    //         return;
    //     }
    // })

    //delete books data from publication
    const updatedPublicationData= await PublicationModal.findOneAndUpdate(
        {
            id:parseInt(req.params.pubId),
        },
        {
            $pull:{
                books:req.params.isbn
            }
        },
        {
            new:true,
        }
    )
    // dataBase.publication.forEach((publication)=>{
    //     if(publication.id===parseInt(req.params.pubId)){
    //         newBooksData=publication.books.filter((book)=>
    //             book!==req.params.isbn
    //         );
    //         publication.books=newBooksData;
    //         return;
    //     }
    // })

    return res.json({
        books:updatedBookData,
        pablications:updatedPublicationData,
        Message:"publication successfully deleted"
    })
});


module.exports=Router;