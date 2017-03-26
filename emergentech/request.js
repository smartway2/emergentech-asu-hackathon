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
    now = now.replace(/%20/ig, ' ');
  };
  var obj = {newMed: now}
      res.writeHead(200, {"Context-Type": "test/plain"});
      res.end(JSON.stringify(obj));
}
http.createServer(onRequest).listen(4000);
console.log('server on');
