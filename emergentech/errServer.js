var http = require('http');
var bool = false;
var onRequest = (req, res) => {
  var umm;
  var now;
  var yum = req.url.split('');
  yum.shift();
  yum = yum.join('');
  yum.replace('%20', ' ');
  if (yum !== 'favicon.ico'){
    now = yum;
    console.log(now);
    now = now.replace(/%20/ig, ' ');
    console.log(now);
  };
  bool = now === 'panic' ? true : false;
  var obj = {panic: bool}
      res.writeHead(200, {"Context-Type": "test/plain"});
      res.end(JSON.stringify(obj));
}
http.createServer(onRequest).listen(5000);
console.log('server on');
