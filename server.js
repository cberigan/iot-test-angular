var express = require('express');
var app = express();

var ledToggle, pressCount;
//provision the gpio pins 22 for the led output and 17 for the button input
var led = require("pi-pins").connect(22),
    button = require("pi-pins").connect(17);

//set the pin mode,  setting pin 22 as an output and 17 as an input
button.mode('in');
led.mode('out');

//set the initial value of the LED to be off.
ledToggle = false;
pressCount = 0;
led.value(true);

// reply to request with "Hello World!"
app.get('/', function (req, res) {
    res.send('button pressed: ' + (++pressCount) + ' time(s)');
});

//start a server on port 80 and log its start to our console
var server = app.listen(80, function () {

  var port = server.address().port;
  console.log('Example app listening on port ', port);

});

//look for a button press event and switch on the LED for 2 seconds when this happens.
button.on('rise', function () {
    res.send();
    console.log('button pressed: ' + (++pressCount) + ' time(s)')
    ledToggle = !ledToggle;
    led.value(ledToggle);
});
