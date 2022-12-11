const express = require("express");
const http = require("http");
const url = require('url');
const app = express();
http.createServer(app).listen(5000);


// Importamos el array del archivo JSON
let usersList = require('./data/users.json')
// Copia original del array
const originalList = [...usersList]

app.get("/users/:page?/:usersPerPage?:orderKey?/:order?", (req, res) => {

    // Parse URL elements
    const queryObject = url.parse(req.url);
    const querystring = require('querystring');

    // Obtenemos el query
    const qs = queryObject.query;
    const stringQuery = querystring.parse(qs)

    // Valores de los query (número de página, key del ordenamiento y forma de ordenamiento: ascendente o descendente)
    const page = stringQuery.page
    const key = stringQuery.orderKey
    const order = stringQuery.order
    const usersPerPage = stringQuery.usersPerPage

    // Función de ordenamiento dependiendo la key que recibe 
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

    // Multiplicador de página * máximo de users por página. Ejemplo, pagina 2 = 20
    const multiplier = page * usersPerPage
    // Index final donde cortar el array
    const end = multiplier
    // Index inicial de donde arranca el array
    const start = multiplier - usersPerPage

    // Array con el numero de paginas
    const pages = []
    for (let i = 1; i <= Math.ceil(usersList.length / usersPerPage); i++) {
        pages.push(i)
    }
    
    // Creamos el objeto de respueta con el array y el numero máximo de páginas
    const responseObject = {
        users: usersList,
        size: pages

    }

    // Cortamos el array para mostrar los usuarios dependiendo la página y su máximo
    const newObject = usersList.slice(start, end)
    // Modificamos el objeto de respueta con el array cortado
    responseObject.users = newObject

    // Usuarios por pagina
    responseObject.usersPerPage = usersPerPage

    // Página actual
    responseObject.page = page

    // Fix cuando se modificado el numero maximo de usuarios por paigna
    if (pages.length < page) {
        responseObject.page = pages.length
    }

    res.json({ responseObject })
})
