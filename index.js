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
let models = require('./models');
const users = models.users;
let messages = models.messages; // Must be a variable and not a constant

// .use() - This method is part of Express Middleware, defines a layer that sits on top of all the other RESTful types
app.use(
    (req, res, next) => {
        const authUserId = 1;
        // TODO: Using req.context allows to pass the values to all the routes and then I can move the routes to other folders without breaking anything
        // You don't need necessarily the context object as a container, but I found it a good practice to keep 
        // everything that is passed to the routes at one place
        req.context = {
            models,
            me: users[authUserId]
        }
        // To use req.context: 
        // e.g. to get all users -> req.context.models.users
        // e.g. to get authenticated user -> req.context.models.users[req.context.me.id]

        //--------------------
        // Pseudo Authenticated User
        //--------------------
        req.me = users[authUserId];        
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
        return res.send(req.context.models.users[req.context.me.id]);
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
        return res.send(Object.values(req.context.models.users)); // Returns the object values from the Models
    }
);

// Show
app.get('/users/:userId',
    // Return Function
    (req, res) => {
        return res.send(req.context.models.users[req.params.userId]); // Returns a specific user depending on the userId from the URI
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
        return res.send(Object.values(req.context.models.messages));
    }
);

// Show
app.get('/messages/:messageId',
    // Return Function
    (req, res) => {
        return res.send(req.context.models.messages[req.params.messageId]); // Returns a specific user depending on the userId from the URI
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
            userId: req.context.me.id,
        }
        
        // Assign the message by identifier to the specific Message Object
        req.context.models.messages[id] = message;

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
        messages[messageId] = {
            id: req.context.models.messages[messageId].id,
            // Extract payload from incoming request
            text: req.body.text,
            userId: req.context.models.messages[messageId].userId
        }

        return res.send(`PUT HTTP method on messages/${req.params.messageId} resource`);
    }
);

// 'DELETE'
// Destroy
app.delete('/messages/:messageId',
    (req, res) => {
        // Here we used a dynamic object property to exclude the message we want to delete from the rest of the messages object
        const { [req.params.messageId]: message, ...otherMessages } = req.context.models.messages;

        // Reassigns values inside messages Object with otherMessages (all the messages except the one just deleted)
        req.context.models.messages = otherMessages;

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
