// text advanture game.

import inquirer from 'inquirer';
import { Enemies } from './Enemies.js';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { Controller } from './Controller.js';
import { IEnemy } from './IApp.js';

// 0~ player name.
// 1~ game start with instruction to the player. defining his role.
// 2~ 3 options to choose from. -start new game -check instructions -exit
// 3~ game starts, first rount you've 50 health points, defender have 50 also.
// 4~ 3 options to choose from. -Defend youself -attack -gain health points
// 5~ Defend yourself: you're in the front of enemy. where you to jump. LEFT-5 | RIGHT-10 | ABOVE-15
// 6~ random number will be generated between 0 to your health points. enemy will succeed to attack if number is in range of selected option.
// 7~ otherwise, user failed to defend and lost random health points.    
// 8~ attack: enemy is in his position. 3 options to attck from. LEFT-5 | RIGHT-10 | ABOVE-15
// 9~ random number will be generated between 0 to enemy health points. enemy will fail to defend if number is in range of selected option.
// 10~ gain points: you only have 2 bottle in start. Each bottle will generate random health points.
// 11~ you've to kill enemy to get his health bottle. 


// console.log(`________instructions________\n`)

export class App extends Controller {

    
    async gameInterval(): Promise<string> {
        const promptOption = await inquirer.prompt([
            {
                type: 'rawlist',
                name: 'options',
                message: 'Choose one the option mention below !!!',
                choices: [
                    {
                        value: '1',
                        name: 'Start new game',
                    },
                    {
                        value: '2',
                        name: 'Check instructions',
                    },
                    {
                        value: '3',
                        name: 'exit',
                    },
                ]
            }
        ]);
        const { options } = await promptOption; 
        return options;
    }

    gameWinner(): void {
        figlet.text('You Win The Game !!!', {
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 120,
            whitespaceBreak: true
        }, ((err, data) => {
            console.log('\n')
            console.log(gradient.rainbow(data))
            console.log('\n')
            console.log(`
            WOW, You killed them:
              ${this.enemy.died.map((e, i) => 
                  chalk.red(`   ${i+1}:   ${e}`)
                )}
            `)
            this.enemy = {
                selected: '',
                opponents: ['Skelton', 'Assesion', 'sohavy'],
                died: [],
                healthPoints: 50
            }
        }));
    }
}


figlet.text('ShinPin Game!', {
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 120,
    whitespaceBreak: true
}, ((err, data) => {
    console.log('\n')
    console.log(gradient.rainbow(data))
    console.log('\n')
    const app: App = new App();
    app.init()
}));


