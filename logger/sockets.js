class Sockets {
    constructor() {
        this.sockets = [];
    }
    pushSocket(socket) {
        this.sockets.push(socket);
    }

    burstData(data) {
        if (data.length > 0)
            this.sockets.map((socket) => socket.emit('message', data));
    }
};

module.exports = Sockets;