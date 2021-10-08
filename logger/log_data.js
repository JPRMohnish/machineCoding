const fs = require('fs');
const { resolve } = require('path');
const { Touchscreen } = require('puppeteer');
class Data {
    constructor(filename, linelimit) {
        this.data = [];
        this.filename = filename;
        this.past = null;
        // this.fd = null;
        this.linelimit = linelimit;
        this.filesize = 0;
    }

    // async openFile() {
    //     return new Promise((resolve, reject) => {
    //         fs.open(this.filename, 'r+', async (err, fd) => {
    //             if (err) reject(err);
    //             this.fd = fd;
    //             resolve(fd);
    //         });
    //     });
    // }

    async readRangeData(start, end, limit) {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(this.filename, {
                encoding: 'utf-8',
                highWaterMark: limit,
                start: start,
                end: end
            });
            let temp = "";
            stream.on('data', (chunk) => {
                console.log("c " + chunk);
                temp += chunk;
            });
            stream.on('end', () => {
                console.log(temp);
                resolve(temp);
            });
            stream.on('error', (err) => {
                reject(err);
            });
        });
    }

    async maintainData(str) {
        // str.reverse();
        Array.prototype.push.apply(this.data, str);
        if (this.data.length > this.linelimit) {
            this.data = this.data.slice(-1 * parseInt(this.linelimit));
        }
    }

    readFile = async () => {
        return new Promise(async (resolve, reject) => {
            // fs.read(this.fd, async (err, bytes, buffer) => {
            //     if (err || bytes < 1) return;
            //     buffer = buffer.toString('utf-8');
            //     let str = "";
            //     for (let c of buffer) {
            //         if (c.charCodeAt(0))
            //             str += c;
            //     }
            //     str = str.match(/[^\r\n]+/g);
            //     await this.maintainData(str);
            //     resolve(str);
            // });
            let buffer = 1024 * 1024;
            this.filesize = fs.statSync(this.filename)['size'];
            let content = "";
            if (this.past === null) {
                // reading data for first time from the file.
                let end = this.filesize - 1;
                while ((content.split('\n')).length <= 10 && end >= 0) {
                    let start = end - buffer;
                    if (start < 0) start = 0;
                    content += await this.readRangeData(start, end, buffer);
                    end = start - 1;
                }
            }
            else {
                let end = this.filesize - 1;
                console.log(end, this.past);
                content += await this.readRangeData(this.past + 1, end, end - this.past + 10);
                // while (end > this.past) {
                //     let start = end - buffer;
                //     if (start <= this.past) {
                //         start = this.past + 1;
                //     }
                //     content += await this.readRangeData(start, end, buffer);
                // }
            }
            console.log(content);
            if (!content || content.length < 1) resolve([]);
            content = content.match(/[^\r\n]+/g);
            console.log(content);
            await this.maintainData(content);
            resolve(content);
        })
    }
}
module.exports = Data;