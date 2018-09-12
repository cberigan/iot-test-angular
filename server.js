var express = require('express');


var  ledRedToggle, ledGreenToggle, pressCount;
//provision the gpio pins 22 for the led output and 17 for the button input
var ledRed = require("pi-pins").connect(22),
    ledGreen = require("pi-pins").connect(27),
    button = require("pi-pins").connect(17);

var app = express();


//set the pin mode,  setting pin 22 as an output and 17 as an input
button.mode('in');
ledRed.mode('out');
ledGreen.mode('out');

//set the initial value of the LED to be off.
ledRedToggle = false;
ledGreenToggle = false;

pressCount= 0;

ledRed.value(false);
ledGreen.value(false);


// reply to request with "Hello World!"
app.get('/', function (req, res) {
  res.send("button pressed: "+ (pressCount) +" time(s)");
});


//toggle green light
app.post('/toggle', function (req, res) {
    ledGreenToggle = !ledGreenToggle;
    ledGreen.value(ledGreenToggle);
  })

//look for a button press event and switch on the LED for 2 seconds when this happens.
button.on('rise', function () {
    ledRedToggle = !ledRedToggle;
    pressCount++;
    ledRed.value(ledRedToggle);
});

//start a server on port 80 and log its start to our console
var server = app.listen(80, function () {

  var port = server.address().port;
  console.log('Example app listening on port ', port);

});
