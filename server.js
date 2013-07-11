

var express = require('express')
  , http = require('http')
  , path = require('path');

  var  app = express();
  var server = app.listen(3000);
  var io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// usernames which are currently connected to the chat
var usernames = {};


app.get('/', function(req, res){
  res.render('index');
});
function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}


io.sockets.on('connection', function(socket) {
  socket.on('draw_event', function(data) {
    console.log(' received data X: ' + data.pageX + " Y: " + data.pageY + " type: " + data.type);
    socket.broadcast.emit('draw_event', {
      pageX: data.pageX,
      pageY: data.pageY,
      type: data.type
      // type: data.type
    });
  });
});
