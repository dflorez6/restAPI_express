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
//--------------------
// Root
//--------------------
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

//--------------------
// Users
//--------------------
// 'GET'
app.get('/users', 
    // Return Function
    (req, res) => {
        return res.send("GET HTTP method on user resource");
    }
);

// 'POST'
app.post('/users', 
    // Return Function
    (req, res) => {
        return res.send("POST HTTP method on user resource");
    } 
);

// 'PUT'
app.put('/users/:userId',
    // Return Function
    (req, res) => {
        return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
    }
);

// 'DELETE'
app.delete('/users/:userId',
    // Return Function
    (req, res) => {
        return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
    }
);

//====================
// Port
//====================
const port = process.env.PORT || 8080; // Using ENV variables
app.listen(3000);
console.log(`Everything executed fine. Open http://localhost:${port}/`);
