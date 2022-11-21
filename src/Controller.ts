import chalk, { chalkStderr } from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import { Enemies } from './Enemies.js';
import { IEnemy } from './IApp.js';



export abstract class Controller extends Enemies {
    abstract gameInterval(): Promise<string>;

    name: string = '';

    enemy: IEnemy = {
        selected: '',
        opponents: ['Skelton', 'Assesion', 'sohavy'],
        died: [],
        healthPoints: 50
    }

    async init(): Promise<void> {
      if(!this.name) {
          const initPrompt = await inquirer.prompt([
              {
                  type: 'input',
                  name: 'name',
                  message: 'What would we like to call you?: ',
                  default: 'Player'
              }
          ])
        this.name = await initPrompt.name;
      }

      if(this.name) {
          this.selectEnemy(this.enemy)
          console.log(`
          ${chalk.overline()}
          Hi ${chalk.bold(this.name)},
          Your enemy: ${chalk.bold(this.enemy.selected) }
          ${chalk.bold(this.enemy.selected)}'s Health: ${chalk.bold(this.enemy.healthPoints)}
          `)
      }

        const options = await this.gameInterval();
        
        if(options) this.processGame(options)

    }
    
    async processGame(options: string): Promise<void> {
        switch(options) {
            case '1':
                console.log(chalk.yellow(`\nYour game has started..... `));
                console.log(
                    chalk.blue(`
                    Enemy at it's position. 3 three option to attack from.
                    Enemy can change his position if he is healthy enough ${chalk.green('(based on health points)')}.
                 `));
                await this.attackOnEnemy(this.enemy);
                break;
            case '2':
                this.instructions()
                break;
            case '3':
                break;        
        }
    }

    instructions(): void {
        console.log(`
          Your Opponent: \n
           ${this.enemy.opponents.map((e, i) => 
             chalk.cyanBright(`   ${i+1}:   ${e}`)
            )}
          \n
          Attack Roles:\n
          ${chalk.bold(chalk.bgBlue('1>'))}: ${chalk.cyan('Enemy is in his position. 3 options to attck from:')}
          ${chalk.greenBright('\n                LEFT 5 Points | RIGHT 10 points | ABOVE 15 points.\n')}
          ${chalk.bold(chalk.bgBlue('2>'))}: ${chalk.magenta('Random number will be generated between 0 to enemy health points. enemy will fail to defend if number is in range of selected option.\n')}
          ${chalk.bold(chalk.bgBlue('3>'))}: ${chalk.magenta('If Selected option\'s points is in range of generated number. You\' will succeed to attack.\n')}                
        `)
        this.init();
    }

}