# README | API REST with Node & Express

## Express (Web Server)
* To install express, from the console:
    > npm install express

## ENV Variables (dotenv)
https://www.youtube.com/watch?v=PxshhOKNPpQ
* From the terminal run:
    
    > npm install dotenv

* Inside index.js (server config file) add the following:
    
        //====================
        // ENV
        //====================
        const path = require('path');
        const dotenv = require('dotenv');
        require('dotenv').config({path: path.resolve(__dirname, './.env')}) // If file is in another path ./folder/.env

* To use ENV variables in the code:

        process.env.ENV_NAME
        // Example PORT=3000 will be the ENV variable used
        process.env.PORT

* To test API endpoints with cURL from the terminal:

    > curl http://localhost:3000
    > -> Received a GET HTTP method

    > curl -X POST http://localhost:3000
    > -> Received a POST HTTP method

    > curl -X PUT http://localhost:3000
    > -> Received a PUT HTTP method

    > curl -X DELETE http://localhost:3000
    > -> Received a DELETE HTTP method

## Library: Unique Identifier - uuid
* In case the app doesn't use a db and we want to generate unique identifiers, from the terminal:
    
    > npm install uuid

* Inside index.js (server config file) add the following:

        import { v4 as uuidv4 } from 'uuid';

## Library: Cross-Origin Resource Sharing - CORS
* Install from the terminal:
    
    > npm install cors

* Inside index.js (server config file) add the following:

        const cors = require('cors');
        app.use(cors()); // To enable CORS requests on all routes

* In case you want to use CORS on specific routes, inside index.js:

        var cors = require('cors')
        // Then on the route
        app.get('/products/:id', cors(), function (req, res) {
            res.json({msg: 'This is CORS-enabled for a Single Route'})
        })
        


## Dependencies
* express-session
* express-validator
* mongoose