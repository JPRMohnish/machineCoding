const fs = require('fs');
class Data {
    constructor(filename, linelimit) {
        this.data = [];
        this.filename = filename;
        this.fd = null;
        this.linelimit = linelimit;
    }

    async openFile() {
        return new Promise((resolve, reject) => {
            fs.open(this.filename, 'r+', async (err, fd) => {
                if (err) reject(err);
                this.fd = fd;
                resolve(fd);
            });
        });
    }

    async maintainData(str) {
        Array.prototype.push.apply(this.data, str);
        if (this.data.length > this.linelimit) {
            this.data = this.data.slice(-1 * parseInt(this.linelimit));
        }
    }

    readFile = async () => {
        return new Promise((resolve, reject) => {
            fs.read(this.fd, async (err, bytes, buffer) => {
                if (err || bytes < 1) return;
                buffer = buffer.toString('utf-8');
                let str = "";
                for (let c of buffer) {
                    if (c.charCodeAt(0))
                        str += c;
                }
                str = str.match(/[^\r\n]+/g);
                await this.maintainData(str);
                resolve(str);
            });
        })
    }
}
module.exports = Data;