var SerialPort = require('serialport');
var port = new SerialPort('/dev/cu.usbmodem1421', {
  baudRate: 115200
});
var stepCount = 0;
port.on('data', function (data) {
  +data >= stepCount ? stepCount = +data : stepCount = stepCount;
  console.log(stepCount);
});
