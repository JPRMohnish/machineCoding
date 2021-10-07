const Execute = require('./commands');
const { exec } = require("child_process");

class Firefox {
    constructor(os) {
        this.browser = null;
        this.os = os
        this.firefox = new Execute(null);
        this.tabs = {};
        this.active = [];
    }
    async open(url) {
        return new Promise(async (resolve, reject) => {
            if (this.os === 'win32') {

            }
            else if (this.os === 'darwin') {

            }
            else {
                resolve(await this.firefox.execute(`firefox ${url}`));
            }
        });
    }

    async close() {
        if (this.os === 'win32') {

        }
        else if (this.os === 'darwin') {

        }
        else {
            await this.firefox.execute('pkill --oldest firefox');
        }
    }

    async clearCache() {
        if (this.os === 'win32') {

        }
        else if (this.os === 'darwin') {

        }
        else {
            await this.firefox.execute('sudo rm ~/.mozilla/firefox/*.default/*.sqlite ~/.mozilla/firefox/*default/sessionstore.js');
            await this.firefox.execute('sudo rm -r ~/.cache/mozilla/firefox/*.default/*');
        }
    }
    async getActiveTab() {
        if (this.os === 'win32') {

        }
        else if (this.os === 'darwin') {

        }
        else {
            exec('brotab list', (error, stdout, stderr) => {
                if (stdout && stdout.length > 0) {
                    let tabs = stdout.split('\n');
                    this.tabs = tabs;
                    exec('brotab active', (error, stdout, stderr) => {
                        if (stdout && stdout.length > 0) {
                            console.log(stdout);

                            let activeTabs = stdout.split('\n');
                            console.log(activeTabs);
                            console.log(tabs);

                            tabs.map(tab => {
                                tab = tab.split('\t');
                                activeTabs.map(active => {
                                    active = active.split('\t');
                                    if (active[0] === tab[0]) {
                                        this.active.push(tab.slice(-1));
                                    }
                                })
                            })
                        }
                    });
                }
            });
        }
    }
}

module.exports = Firefox;