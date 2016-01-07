

var weather = require('./weather.js'); 
var userInput = process.argv.slice(2);
weather.get(userInput);


