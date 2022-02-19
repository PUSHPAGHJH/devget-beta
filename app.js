const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require("path");

const app = express();
app.use(cookieParser());

dotenv.config({ path: './config.env' });

require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());

// we link the router files to make our route easy 
app.use("/api", require('./router/auth'));
app.use("/uploads", express.static(path.resolve(__dirname, "./uploads")));

// heroku code
if (process.env.NODE_ENV = 'production') {
    app.use(express.static(path.resolve(__dirname, "./build")))
    app.all('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "./build/index.html"))
    })
}

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server is runnig at port no ${PORT}`);
})


