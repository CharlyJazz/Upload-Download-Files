// TODO: var socketio = require('socket.io-client')('http://' + document.domain + ':' + location.port);

function readFileChunk (file, offset, length, success, error) {
	let end_offset = offset + length;
	if (end_offset > file.size)
		end_offset = file.size;
	let r = new FileReader();
	r.onload = function(file, offset, length, event) {
		if (event.target.error != null)
			error(file, offset, length, event.target.error);
		else
			success(file, offset, length, event.target.result);
	}.bind(r, file, offset, length);
	r.readAsArrayBuffer(file.slice(offset, end_offset));
}

const onReadSuccess = (file, offset, length, data) => {
	// Read success callback
	if (this.state.done) return;
	
	if (!socketio.connected) {
		// The WebSocket connection was lost, wait until it comes back
		setTimeout(onReadSuccess.bind(this, file, offset, length, data), 5000);
		return;
	}
	
	socketio.emit('write-chunk', this.server_filename, offset, data, function(offset, ack) {
		if (!ack) {
			onReadError(this.file, offset, 0, 'Transfer aborted by server')
		}
	}.bind(this, offset));
	
	let end_offset = offset + length;
	
	this.state.progress.style.width = parseInt(300 * end_offset / file.size) + "px";
	
	if (end_offset < file.size)
		readFileChunk(file, end_offset, this.state.chunk_size, onReadSuccess.bind(this), onReadError.bind(this));
	else {
		this.state.progress.classList.add('complete');
		this.state.progresss.classList.remove('in-progress');
		this.state.done = true;
	}
};

function onReadError(file, offset, length, error) {
	// Read error callback
	console.log('Upload error for ' + file.name + ': ' + error);
	this.progress.classList.add('error');
	this.progress.classList.remove('in-progress');
	this.done = true;
}


module.exports = {
	readFileChunk,
	onReadSuccess,
	onReadError
};