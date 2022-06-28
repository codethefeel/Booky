//Prifix:/publication

//initialising Express

const Router=require("express").Router();

//initialising PublicationModal

const PublicationModal=require("../../dataBase/publication");

/*
ROUTE          /PUBLICATION
DESCRIPTION    GET ALL PUBLICATION'S DATA
ACCESS         PUBLIC
PARAMETER      NONE
METHOD         GET
*/

Router.get("/",async(req,res)=>{
    return res.json({books:await PublicationModal.find()});
});

/*
ROUTE          /publication/id
DESCRIPTION    GET SPECIFIC PUBLICATION'S DATA
ACCESS         PUBLIC
PARAMETER      :id
METHOD         GET
*/
Router.get("/:id",async(req,res)=>{
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


Router.get("/book/:isbn",async(req,res)=>{
    const getSpecificPublication = await PublicationModal.findOne({ISBN:req.params.isbn})
    //const getSpecificPublication = dataBase.publication.filter((publication)=> publication.books.includes(req.params.isbn));
    if(!getSpecificPublication){
        return res.json({error:`sorry! ${req.params.isbn} publication's books are not available`})
    };
    return res.json({Publications:getSpecificPublication});
});


/*
ROUTE          /publication/add
DESCRIPTION    POST NEW PUBLICATION DATA
ACCESS         PUBLIC
PARAMETER      NONE
METHOD         POST
*/

Router.post("/add",async(req,res)=>{
    const {newPublication} = req.body;
    const addNewPublication = await PublicationModal.create(newPublication);
    //dataBase.publication.push(newPublication);
    return res.json({Publications:addNewPublication});
});

module.exports=Router;