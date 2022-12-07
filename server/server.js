const express = require("express");
const http = require("http");

const app = express();

const usersList = require('./data/users.json')
const pages = []
for( let i = 1; i<= Math.ceil(usersList.length/10); i++){
    pages.push(i)
}

const requestObject = {
    users: usersList,
    size: pages
}

http.createServer(app).listen(5000);

app.get("/api", (req, res) => {
    res.json({ requestObject })
})
