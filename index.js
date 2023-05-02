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
const { v4: uuidv4 } = require('uuid');; // unique identifiers library
// TODO: Other dependencies go here

// Define my app
let app = express();

// Decode post information from the URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//====================
// Data & Logic - Custom Modules
//====================
const dbFakeData = require('./logic/dbFakeData.js');
const usersData = dbFakeData.usersData();
let messagesData = dbFakeData.messagesData(); // Must be a variable and not a constant

// TODO: This is temporary
//====================
// Pseudo Authenticated User
//====================
// .use() - This method is part of Express Middleware, defines a layer that sits on top of all the other RESTful types
app.use(
    (req, res, next) => {
        const authUserId = 1;
        req.me = usersData[authUserId];
        next();
    }
);

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
// Session (for authenticated User)
//--------------------
// 'GET'
// Returns Authenticated User Object
app.get('/session', 
    // Return Function
    (req, res) => {        
        return res.send(usersData[req.me.id]);
    }
);

//--------------------
// Users
//--------------------
// 'GET'
// Index
app.get('/users', 
    // Return Function
    (req, res) => {
        return res.send(Object.values(usersData)); // Returns the object values from the custom module
    }
);

// Show
app.get('/users/:userId',
    // Return Function
    (req, res) => {
        return res.send(usersData[req.params.userId]); // Returns a specific user depending on the userId from the URI
    }
);

// 'POST'
// Create
app.post('/users', 
    // Return Function
    (req, res) => {
        return res.send("POST HTTP method on user resource");
    } 
);

// 'PUT'
// Update
app.put('/users/:userId',
    // Return Function
    (req, res) => {
        return res.send(`PUT HTTP method on users/${req.params.userId} resource`);
    }
);

// 'DELETE'
// Destroy
app.delete('/users/:userId',
    // Return Function
    (req, res) => {
        return res.send(`DELETE HTTP method on users/${req.params.userId} resource`);
    }
);

//--------------------
// Messages
//--------------------
// 'GET'
// Index
app.get('/messages',
    // Return Function
    (req, res) => {
        return res.send(Object.values(messagesData));
    }
);

// Show
app.get('/messages/:messageId',
    // Return Function
    (req, res) => {
        return res.send(messagesData[req.params.messageId]); // Returns a specific user depending on the userId from the URI
    }
);

// 'POST'
// Create
app.post('/messages',
    // Return Function
    (req, res) => {
        // Create unique identifier
        const id = uuidv4();
        // Use id as a property in a message object with a shorthand object property initialization
        const message = {
            id,
            // Extract payload from incoming request
            text: req.body.text,
            userId: req.me.id,
        }
        
        // Assign the message by identifier in the Messages Object (comes from custom module dbFakeData.js)
        messagesData[id] = message;

        // Return new message after it has been created
        return res.send(message);
    }
);

// 'PUT'
// Update
app.put('/messages/:messageId',
    // Return Function
    (req, res) => {
        const messageId = req.params.messageId;
        
        // Updates Message Object values
        messagesData[messageId] = {
            id: messagesData[messageId].id,
            // Extract payload from incoming request
            text: req.body.text,
            userId: messagesData[messageId].userId
        }
        
        return res.send(`PUT HTTP method on messages/${req.params.messageId} resource`);
    }
);

// 'DELETE'
// Destroy
app.delete('/messages/:messageId',
    (req, res) => {
        // Here we used a dynamic object property to exclude the message we want to delete from the rest of the messages object
        const { [req.params.messageId]: message, ...otherMessages } = messagesData;

        // Reassigns values inside messagesData Object with otherMessages (all the messages except the one just deleted)
        messagesData = otherMessages;

        return res.send(message);
        // return res.send(`DELETE HTTP method on messages/${req.params.messageId} resource`);
    }
);

//====================
// Port
//====================
const port = process.env.PORT || 8080; // Using ENV variables
app.listen(3000);
console.log(`Everything executed fine. Open http://localhost:${port}/`);
