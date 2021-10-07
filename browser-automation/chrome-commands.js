const Execute = require('./commands');
const { exec } = require("child_process");
class Chrome {
    constructor(os) {
        this.browser = null;
        this.os = os
        this.chrome = new Execute(null);
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
                resolve(await this.chrome.execute(`google-chrome ${url}`));
            }
        });
    }

    async close() {
        if (this.os === 'win32') {

        }
        else if (this.os === 'darwin') {

        }
        else {
            await this.chrome.execute('pkill --oldest chrome');
        }
    }

    async clearCache() {
        if (this.os === 'win32') {

        }
        else if (this.os === 'darwin') {

        }
        else {
            await this.chrome.execute('sudo rm -rf ~/.config/google-chrome/Default/');
            await this.chrome.execute('sudo rm -rf ~/.cache/google-chrome/default');
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

module.exports = Chrome;