var socket = io('ws://localhost:3000');
console.log("hello");

socket.on('message', (data) => {
    for (let line of data) {
        if (line && line.length > 0) {
            const el = document.createElement('li');
            el.innerHTML = line;
            document.querySelector('ul').appendChild(el);
        }
    }
});