var io = require('socket.io-client')('http://' + document.domain + ':' + location.port);

io.on('connect', () => {
	io.emit('connected');
});

export default io;