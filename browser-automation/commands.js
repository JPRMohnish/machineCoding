const { exec } = require("child_process");
class Execute {
    constructor() {
        this.tabs = [];
        this.activeTabs = [];
    }
    async execute(command) {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            if (stdout && stdout.length > 0) {
                this.tabs = stdout.split('\t');
            }
        });
    }
}
module.exports = Execute;