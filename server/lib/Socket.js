var socket = require('socket.io-client')('https://sms-custer.herokuapp.com');
// var socket = require('socket.io-client')(process.env.CUSTER_SOCKET);
socket.on('connect', () => {
	console.log('socket connected with sms Custer');
});

module.exports = socket;
