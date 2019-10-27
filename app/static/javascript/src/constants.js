export const CHUNK_SIZE = 64 * 1024;
export const io = require('socket.io-client')('http://' + document.domain + ':' + location.port);
