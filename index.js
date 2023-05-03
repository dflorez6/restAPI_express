//====================
// ENV
//====================
const path = require('path');
// const dotenv = require('dotenv');
require('dotenv').config({path: path.resolve(__dirname, './.env')})

//====================
// Import the dependencies
//====================
const express = require('express');
const { v4: uuidv4 } = require('uuid');; // unique identifiers library
// TODO: Other dependencies go here

// Define my app
const app = express();

// Decode post information from the URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//====================
// Models
//====================
let models = require('./models');

// .use() - This method is part of Express Middleware, defines a layer that sits on top of all the other RESTful types
app.use(
    (req, res, next) => {
        const authUserId = 1;
        // TODO: Using req.context allows to pass the values to all the routes and then I can move the routes to other folders without breaking anything
        // You don't need necessarily the context object as a container, but I found it a good practice to keep 
        // everything that is passed to the routes at one place
        req.context = {
            models,
            me: models.users[authUserId]
        }
        // To use req.context: 
        // e.g. to get all users -> req.context.models.users
        // e.g. to get authenticated user -> req.context.models.users[req.context.me.id]

        //--------------------
        // Pseudo Authenticated User
        //--------------------
        req.me = models.users[authUserId];        
        next();
    }
);

//====================
// Routes
//====================
// Modularization of Routes
const routes = require('./routes');
app.use('/session', routes.session)
app.use('/users', routes.user)
app.use('/messages', routes.message)

//====================
// Port
//====================
const port = process.env.PORT || 8080; // Using ENV variables
app.listen(3000);
console.log(`Everything executed fine. Open http://localhost:${port}/`);
