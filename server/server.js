const express = require("express");
const http = require("http");

const app = express();

// Importamos el array del archivo JSON
const usersList = require('./data/users.json')
const url = require('url');

// Maximo de users
const maxUsers = 10

// Numero maximo de paginas
const pages = []
for( let i = 1; i<= Math.ceil(usersList.length/maxUsers); i++){
    pages.push(i)
}

// Creamos el objeto de respueta con el array y el numero maximo de paginas
const responseObject = {
    users: usersList,
    size: pages
}

http.createServer(app).listen(5000);

app.get("/api/:page?", (req, res) => {
    
    // Parse URL elements
    const queryObject = url.parse(req.url);
    const querystring = require('querystring');

    // Obtenemos el query
    const qs = queryObject.query;
    const stringQuery = querystring.parse(qs)

    // Valor del query page
    const page = stringQuery.page

    // Multiplicador de pagina * 10. Ejemplo, pagina 2 = 20
    const multiplier = page * maxUsers
    // Index final donde cortar el array
    const end = multiplier
    // Index inicial de donde arranca el array
    const start = multiplier - maxUsers 
    // Cortamos el array para mostrar 10 usuarios dependiendo la pagina
    const newObject = usersList.slice(start, end)

    // Modificamos el objeto de respueta con el array cortado
    responseObject.users = newObject

    // Pasamos el total maximo de paginas
    responseObject.page = page
    
    res.json({ responseObject })
})
