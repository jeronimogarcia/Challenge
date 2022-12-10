const express = require("express");
const http = require("http");

const app = express();

// Importamos el array del archivo JSON
let usersList = require('./data/users.json')
const url = require('url');
const originalList = [...usersList]
// Maximo de users
const maxUsers = 10

// Numero maximo de paginas
const pages = []
for (let i = 1; i <= Math.ceil(usersList.length / maxUsers); i++) {
    pages.push(i)
}

// Creamos el objeto de respueta con el array y el numero maximo de paginas
const responseObject = {
    users: usersList,
    size: pages
}

http.createServer(app).listen(5000);

app.get("/users/:page?/:orderKey?/:order?", (req, res) => {

    // Parse URL elements
    const queryObject = url.parse(req.url);
    const querystring = require('querystring');


    // Obtenemos el query
    const qs = queryObject.query;
    const stringQuery = querystring.parse(qs)

    console.log(stringQuery)
    // Valor del query page
    const page = stringQuery.page
    const key = stringQuery.orderKey
    const order = stringQuery.order

    if (key) {
        if (order === 'asc') {
            usersList.sort(function (a, b) {
                if (a[key] < b[key]) { return -1; }
                if (a[key] > b[key]) { return 1; }
                return 0;
            })
        } else {
            usersList.sort(function (a, b) {
                if (a[key] < b[key]) { return 1; }
                if (a[key] > b[key]) { return -1; }
                return 0;
            })
        }
    } else {
        usersList = [...originalList]
    }

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
