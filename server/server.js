const express = require("express");
const http = require("http");

const app = express();
const userList = require('./data/users.json')

http.createServer(app).listen(5000);

app.get("/api", (req, res) => {
    res.json({ userList })
})
