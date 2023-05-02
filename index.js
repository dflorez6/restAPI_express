
//====================
// Import the dependencies
//====================
const express = require('express');
let myApp = express(); // Define myApp

//====================
// Response Function Object
//====================
let funcResponse = function(req, res) {
    // Response
    res.send('<h1>Server up and running!</h1>');
};

//====================
// Routes
//====================
// 'get' root page
myApp.get('/', 
    // Callback Function
    function (req, res) {
        let responseData = {
            message: 'Hello'
        }

        res.send(responseData);
    }
);

//====================
// Port
//====================
myApp.listen(3000);
console.log('Everything executed fine. Open http://localhost:3000/');