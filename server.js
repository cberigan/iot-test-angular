var express = require('express');
var path = require('path');

var  ledRedToggle, ledGreenToggle, pressCount;
//provision the gpio pins 22, 27 for the led output and 17 for the button input
var ledRed = require("pi-pins").connect(22),
   ledGreen = require("pi-pins").connect(27),
   button = require("pi-pins").connect(17);
    const html = __dirname + '/dist/iot-test-app';
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


const bodyParser = require('body-parser');
const compression = require('compression');
app.use(compression())
.use(bodyParser.json())
.use(bodyParser.urlencoded({extended: false}))
.use(express.static(html))

// reply to request with "Hello World!"
app.get('*', function (req, res) {
  res.sendFile(path.join(html,'index.html'));
});


//toggle green light
app.post('/api/state', function (req, res) {
  ledGreenToggle = !ledGreenToggle;
  ledGreen.value(ledGreenToggle);
  res.json({on: ledGreenToggle});
})

app.get('/api/state', function (req, res) {
  res.json({on: ledGreenToggle});
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
