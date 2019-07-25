'use strict'

class ChatController {
  userId;

  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
    console.log('user joined with %s socket id', socket.id);
    setTimeout(this.emitCommand.bind(this), 10000);
  }

  onMessage (message) {
    // this.socket.broadcastToAll('message', message)
  }

  onPort (message) {
    console.log('\nfrom:  ', message.printerId, '\nsocket:', this.socket.id, '\nport:  ', this.socket.id.charCodeAt(this.socket.id.length - 1),'\n');
    this.socket.broadcastToAll('port', this.socket.id.charCodeAt(this.socket.id.length - 1));
  }

  emitCommand() {
    console.log('sending command');
    this.socket.broadcastToAll('command', {
      //msg_type: 'command', // Not required as the message type is the topic emitted
      msg_type_version: 1,
      command_id: '123ABC456DEF',
      display_text: 'Hello this is Patrick',
      gcode: 'ECHO "Hello, world!"',
      priority: 5, //X, 0, 1, 2, 3, 4, 5, 6, etc (Higher number is lower priority)
      timeout_s: 30, //0 is no timeout, time in seconds
      cmd_type: 'UserAcceptCancel',
    });
  }
}

module.exports = ChatController
