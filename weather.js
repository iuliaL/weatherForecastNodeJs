//Problem: Look at forecast.io API and display the weather for a chosen city specifying the latitude and longitude:
// solution: use Node.js to connect to tforecast.io`s API to get the info about the forecast of the city

var https = require('https');
var http = require('http');
var APIkey = '94a5e09b695a49adc6571349135c13ef'; //got it from forecast.io API 
var userInput = process.argv.slice(2); // this means when doing node app.js LATITUDE LONGITUDE in the console
//it makes an array [node,app.js,LATITUDE,LONGITUDE] and i use slice to keep the array with just the last 2 items -LAT,LONG
console.log('you asked for the city that is situated at the following coordinates: ' + userInput[0] + ' latitude and ' + userInput[1] + ' longitude.'+' That would be:');

function printForecast(city, forecast) {
  var message = city + '- the current weather is: ' + forecast;
  console.log(message);
}

function printError(error){
  console.error(error.message);
}


var get = function(userInput){
//connect to the API url : https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE
var request = https.get('https://api.forecast.io/forecast/' + APIkey + '/' + userInput[0] + "," + userInput[1] , function(response){
  //read the data
  var body = '';
  response.on('data', function(chunk){
  body += chunk;
  });
  response.on('end', function(){
    if (response.statusCode === 200) {
        try {
        //parse the data
        var responseData = JSON.parse(body);
        var forecast = responseData.currently.summary + ' and the outside temperature is ' + responseData.currently.temperature + ' degrees Fahrenheit.' ;
        //print the data out
        printForecast(responseData.timezone,forecast);
        } catch(error) {
          //if a parsing error occurs
          printError(error);
        }
    } else { 
      //Status code error
      printError({ message : 'THERE WAS AN ERROR GETTING THE WEATHER FOR ' + responseData.timezone + '. (' + http.STATUS_CODES[response.statusCode] + ')'});
    }
  }); // --- end response
}); // --- end request

// connection error
request.on('error', printError);
}; //-end get

//get();  // i exported the module to the app.js


module.exports.get = get;