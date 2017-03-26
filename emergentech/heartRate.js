var http = require('http');
var SerialPort = require('serialport');
var port = new SerialPort('/dev/cu.usbmodem1411', {
  baudRate: 9600
});
var heartRate = 0;
var port2 = new SerialPort('/dev/cu.usbmodem1421', {
  baudRate: 115200
});
var stepCount = 0;
port2.on('data',(data) => {
  +data >= stepCount ? stepCount = +data : stepCount = stepCount;
});
port.on('data',(data) => {
  Math.abs(heartRate - +data) > 10 ? heartRate = heartRate : heartRate = +data;
});

var onRequest = (req, res) => {
  var umm;
  var now;
  var yum = req.url.split('');
  yum.shift();
  yum = yum.join('');
  yum.replace('%20', ' ');
  if (yum !== 'favicon.ico'){
    now = yum;
    now = now.replace(/%20/ig, ' ');
  };
  console.log(stepCount);
  var obj = {
    heartRate: heartRate + 65,
    stepCount: stepCount
  }
      res.writeHead(200, {"Context-Type": "test/plain"});
      res.end(JSON.stringify(obj));
}
http.createServer(onRequest).listen(8080);
console.log('server on');
