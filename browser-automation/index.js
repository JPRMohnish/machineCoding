const app = require('express')();
const { platform } = require('os');
const WINDOWS_PLATFORM = 'win32';
const MAC_PLATFORM = 'darwin';
const Chrome = require('./chrome-commands');
const Firefox = require('./firefox-commands');
const os = platform();
const eventLoop = async () => {
    const chrome = new Chrome(os);
    const firefox = new Firefox(os);
    await chrome.open('https://www.google.com');
    await firefox.open('https://www.google.com');
    setTimeout(
        async () => {
            let active = await new Promise((resolve, reject) => {
                chrome.getActiveTab();
                setTimeout(() => {
                    resolve(chrome.active);
                }, 3000);
            });
            console.log(active);
            active = await new Promise((resolve, reject) => {
                firefox.getActiveTab();
                setTimeout(() => {
                    resolve(chrome.active);
                }, 3000);
            });
            console.log(active);
        },
        3000);
}
eventLoop();