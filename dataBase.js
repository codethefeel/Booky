let books=[{
    ISBN:"12345BOOK",
    title:"How to Die",
    pubDate:"31/12/2999",
    language:"en",
    numPage:199,
    category:["selfDevelopment","spritual","tech"],
    publication:[1,2],
    author:[1,2]
},
{
    ISBN:"123456BOOK",
    title:"How to Die 2",
    pubDate:"31/12/2999",
    language:"hindi",
    numPage:200,
    category:["selfDevelopment","spritual"],
    publication:[1],
    author:[2]
}];

const author=[{
    id:1,
    name:"Feelcoder",
    books:["12345BOOK"]
},
{
    id:2,
    name:"undefined",
    books:["12345BOOK","123456BOOK"]
}];

const publication=[{
    id:1,
    name:"writex",
    books:["123456BOOK","12345BOOK"]
},
{
    id:2,
    name:"amazonwow",
    books:["12345BOOK"]
},
{
    id:3,
    name:"amazonwow2",
    books:[]
}];


module.exports={books,author,publication};