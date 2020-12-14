const http = require("http");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan")
const logger = morgan("tiny")

const app = express()
const server = http.createServer(app)

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const PORT = 3000;

const db = [
    {
        title: 'Sapiens',
        author: 'Yuval Noah Harari',
        isbn: 'abc-123-xyz-456',
        price: 20,
        description: 'A brief history of humankind'
    },
    {
        title: 'Cosmos',
        author: 'Carl Sagan',
        isbn: 'def-456-abc-789',
        price: 10,
        description: 'A brief history of space and science'
    },
    {
        title: 'Breakfast of Champions',
        author: 'Kurt Vonnegut',
        isbn: 'ghi-789-pqr-123',
        price: 8,
        description: 'Satirical look at American society'
    },
    {
        title: 'One Hundred Years of Solitude',
        author: 'Gabriel Garcia Marquez',
        isbn: 'jkl-101-stu-456',
        price: 25,
        description: 'Story of how a family lives over many generations'
    },
    {
        title: 'Homage to Catalonia',
        author: 'George Orwell',
        isbn: 'mno-112-vwx-917',
        price: 12,
        description: 'A look at the Spanish Civil War'
    },
]

app.use(helmet())
app.use(logger)

const makeListItem = (objArr, i)=>{
    return `
    <h3>*****************</h3>
    <li><a href="/isbn.html">Title: ${objArr[i].title}</a></li>
    <li>Author: ${objArr[i].author}</li>
    <li>Price: ${objArr[i].price}</li>
    `
}

const fancyArray = db.map((el, i)=>{
    return makeListItem(db, i)
}).join('')

const makeCard = (objArr, i)=>{
    let title = objArr[i].title;
    let author = objArr[i].author;
    let isbn = objArr[i].isbn;
    let price = objArr[i].price;
    let description = objArr[i].description;
    return `
    <h1>${title}</h1>
    <ul>
        <li>Author: ${author}</li>
        <li>isbn: ${isbn}</li>
        <li>Price: ${price}</li>
    </ul>
    <p>${description}</p>
    `
}

const makeCorrectCard = (data)=>{
   for(let i = 0; i <= data.length;i++){
    if(data[i].title === 'Sapiens'){
        return makeCard(db,0)
    } else if (data[i].title === 'Cosmos'){
        return makeCard(db,1)
    } else if (data[i].title === 'Breakfast of Champions'){
        return makeCard(db,2)
    } else if (data[i].title === 'One Hundred Years of Solitude'){
        return makeCard(db,3)
    } else if (data[i].title === 'Homage to Catalonia'){
        return makeCard(db,4)
    }
}
}


app.get('/',(req,res)=>{
    res.render('home',{
        locals: {
            fancyArray: fancyArray
        }
    })
})

app.get('/:title',(req,res)=>{
    const {title} = req.params;
    
    res.render(`${title}`,{
        locals: {
            page: makeCorrectCard(db),
            title: title

        }
    })
})

server.listen(PORT, ()=>{
    console.log(`Running on http://localhost:${PORT}`)
})

