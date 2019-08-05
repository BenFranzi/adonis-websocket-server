'use strict'

class PrinterController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
    console.log('user joined with %s socket id', socket.id);
    setTimeout(this.emitCommand.bind(this), 30000);
  }

  onConnect (message) {
    console.log('\x1b[44m%s\x1b[0m', `connect received`);
    // this.socket.broadcastToAll('message', message)
  }

  onPort (message) {
    console.log('\nsocket:', this.socket.id, '\nport:  ', this.socket.id.charCodeAt(this.socket.id.length - 1),'\n');
    this.socket.broadcastToAll('port', this.socket.id.charCodeAt(this.socket.id.length - 1));
    //this.emitCommand(this);
  }

  onAcceptuser (message) {
    console.log('User accept message received', message);
  }

  onRejectuser (message) {
    console.log('User reject message received');
  }

  onResponse (response) {
    console.log('Response', response);
  }

  emitCommand() {
    console.log('sending command');
    this.socket.broadcastToAll('command', {
      //msg_type: 'command', // Not required as the message type is the topic emitted
      msg_type_version: 1,
      command_id: '123ABC456DEF',
      display_text: 'Request to print file: File.gcode',
      gcode: 'ECHO "Hello, world!"',
      priority: 5, //X, 0, 1, 2, 3, 4, 5, 6, etc (Higher number is lower priority)
      timeout_s: 10, //0 is no timeout, time in seconds
      cmd_type: 'UserAcceptCancel',
    });
    setTimeout(this.emitCommand.bind(this), 30000);
  }
}

module.exports = PrinterController
