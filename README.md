## Breinify Coding Challenge

Implementation of user interface and server side script to retrieve, compile, and display 100 cards from node server and database. Peforms actions such as creating new cards, editing cards, and deleting cards. Performs filtering actions such as sorting by ascending or descending order and filtering by name.

## Overview:

This exercise uses the Javascript library React for user interface and Nodejs/Express for server-side scripting.
To initiate HTTP requests, this exercise uses Express and Nodejs.
For server-side requests, this exercise uses axios to retrieve processed data from MongoDB.
For CSS and HTML styling, this exercise uses bootstrap and react-bootstrap.

## Tech Used / Dependencies:

- React (create-react-app)
- Nodejs
- axios (https://www.npmjs.com/package/axios)
- Express
- MongoDB (Database)
- bootstrap (https://getbootstrap.com/)
- react-bootstrap (https://react-bootstrap.github.io/)

## Requirements:

This project requires the following:

- Nodejs (>= 8.10)
- npm (>= 5.6) OR yarn (for dependency installion and React build)

## Installation:

- Dependency installation:
  npm install --save axios express mongoose react-bootstrap bootstrap
  OR
  yarn add axios express mongoose react-bootstrap bootstrap

## Deployment:

- Server Side (http://localhost:5000/):
  node server.js

- Client (http://localhost:3000/)
  npm start OR yarn start

## Directories/Files/Components:

backend
- server.js - Nodejs script for server
- models - Card Schemas
- routes- AJAX calls and routes

src (Contains all user interface files, libraries, and packages)
- components - Contains all class components such as card-list, dashboard, create-card, edit-card
- app.js - User interface page
