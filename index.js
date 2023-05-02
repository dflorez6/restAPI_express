//====================
// ENV
//====================
const path = require('path');
const dotenv = require('dotenv');
require('dotenv').config({path: path.resolve(__dirname, './.env')})

//====================
// Import the dependencies
//====================
const express = require('express');
// TODO: Other dependencies go here

// Define my app
let app = express();

// Decode post information from the URL
app.use(express.urlencoded({extended:false}));

//====================
// Routes
//====================
// 'get' root page
// TODO: Temporarily Commented
/*
app.get('/', 
// Return Function
(req, res) => {
    let responseData = {
        message: 'Hello World'
    }
    
    return res.send("Hello World 1!");
    // res.send(responseData);
}
);
*/

// HTTP METHODS
// 'GET'
app.get('/', 
    // Return Function
    (req, res) => {
        return res.send("Received a GET HTTP method");
    }
);

// 'POST'
app.post('/', 
    // Return Function
    (req, res) => {
        return res.send("Received a POST HTTP method");
    } 
);

// 'PUT'
app.put('/',
    // Return Function
    (req, res) => {
        return res.send("Received a PUT HTTP method");
    }
);

// 'DELETE'
app.delete('/',
    // Return Function
    (req, res) => {
        return res.send("Received a DELETE HTTP method");
    }
);

//====================
// Port
//====================
const port = process.env.PORT || 8080; // Using ENV variables
app.listen(3000);
console.log(`Everything executed fine. Open http://localhost:${port}/`);
