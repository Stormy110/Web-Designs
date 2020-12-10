const http = require("http");
const express = require("express");
const morgan = require("morgan");
const logger = morgan('tiny');
const helmet = require("helmet");

const app = express();
const server = http.createServer(app)

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const PORT = 3000;

app.use(logger);
app.use(helmet());
app.use(express.static('public'))
const pets = [
    "Cash", "Stella", "Aspen", "Mao", "Matilda"
];


app.get('/',(req,res)=>{
    res.render('home');
});

app.get('/pets', (req,res)=>{
    res.render('pets',{
        locals:{
            pets: pets
        }
    });
});


app.get('/pets/:name', (req,res)=>{
    const {name} = req.params;
    console.log(name)
    res.render('petname', {
        locals: {
            name: name
        }
    })
});


server.listen(PORT, ()=>{
    console.log(`Running on http://localhost:${PORT}`);
});