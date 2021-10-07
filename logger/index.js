const express = require('express');
const { fstat } = require('fs');
const app = express();
const http = require('http').Server(app);
const filename = __dirname + '/logger.txt';
const linelimit = 10;
const Data = require('./log_data');
const Sockets = require('./sockets');
const Socket = new Sockets();
const fs = require('fs');

const eventLoop = async () => {
    const data = new Data(filename, linelimit);
    await data.openFile();
    await data.readFile();
    const io = require('socket.io')(http, {
        cors: { origin: "*" }
    })

    app.use(express.static("public"));


    app.get('/logs', (req, res) => {
        res.sendFile('public/index.html', { root: __dirname });
    });

    io.on('connection', async (socket) => {
        console.log("client connected");
        Socket.pushSocket(socket);
        socket.emit('message', data.data);
    });

    fs.watch(filename, async (event, filename) => {
        const changed_data = await data.readFile();
        if (changed_data) {
            Socket.burstData(changed_data);
        }
    });

    http.listen(3000, (err) => {
        err ? console.log(err) : console.log("http server connected on posrt 3000");
    });
}

eventLoop();
