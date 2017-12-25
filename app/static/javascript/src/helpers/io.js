var io = require('socket.io-client')('http://' + document.domain + ':' + location.port);

io.on('connect', function() {
	io.emit('connected');
});

export default io;