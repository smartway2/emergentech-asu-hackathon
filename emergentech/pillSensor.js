var SerialPort = require('serialport');
var port = new SerialPort('/dev/cu.usbmodem1411', {
  baudRate: 9600
});
var dist = 0;
port.on('data', function (data) {
  Math.abs(dist - +data) > 10 ? dist = dist : dist = +data;
  console.log(dist);
});
