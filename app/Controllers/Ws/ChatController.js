'use strict'

class ChatController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
    console.log('user joined with %s socket id', socket.id)
  }

  onMessage (message) {
    // this.socket.broadcastToAll('message', message)
  }

  onPort (message) {
    console.log('\nfrom:  ', message.printerId, '\nsocket:', this.socket.id, '\nport:  ', this.socket.id.charCodeAt(this.socket.id.length - 1),'\n');
    this.socket.broadcastToAll('port', this.socket.id.charCodeAt(this.socket.id.length - 1));
  }

  onPing() {
    console.log('on ping')
  }
}

module.exports = ChatController
