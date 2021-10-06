const chalk = require('chalk');
const inquirer = require('inquirer')

class Queries {
    constructor(dataset) {
        this.dataset = dataset
        this.questions = [
            {
                type: 'String',
                name: 'name',
                message: "Enter Actor Name"
            },
            {
                type: 'Number',
                name: 'top',
                message: "Enter no of best movies"
            }
        ];
    }
    async ask() {
        return new Promise(async (resolve, reject) => {
            let topMovies = [];
            await inquirer.prompt(this.questions).then(async (answers) => {
                let no = parseInt(answers['top']);
                let actor = answers['name'];
                console.log(chalk.yellow(`These are top ${no} movies of ${actor}`));
                await this.dataset.forEach(async (movie) => {
                    if (no > 0) {
                        if (await movie.actors.includes(actor)) {
                            topMovies.push(movie);
                            no--;
                        }
                    }
                });
            });
            resolve(topMovies);
        });
    }
}
module.exports = Queries;