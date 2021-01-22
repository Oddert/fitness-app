# Fitness App

Lightweight personal activity tracker. Created for a FreeCodeCamp project

## Live Demo
[https://pumped-wry-piper.glitch.me/](https://pumped-wry-piper.glitch.me/)

## Installation
```
$ git clone https://github.com/Oddert/fitness-app.git
$ cd fitness-app
$ npm i
$ npm start
```

## Scripts
| script | command | action
|--------|---------|------------|
| start  | node app.js | runs the server |
| dev | nodemon app.js | runs the server with auto restart |

# Routes
| Route  | Mathod | Body | Query | Returns
|--------|-------------|-------------------|----|----|
| /         | GET |  | | A basic html page to interact with the API |
| /adduser  | POST | username: the username to add | | Creates a user and returns a JSON object representing the new user |
| /addactivity  | POST  | username: the user to assign the new activity to | | A JSON object represting the activity added or an error |
| /api/log  | GET | | username: {String} - The user to search for. from: (optional) {JS compatable date} the start date. to: (optional) {JS compatable date} the end date | All entried for a particular user or between the dates specified. |

