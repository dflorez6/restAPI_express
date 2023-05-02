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

## Dependencies
* express-session
* express-validator
* mongoose