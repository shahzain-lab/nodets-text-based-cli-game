import inquirer from 'inquirer';
import chalk from 'chalk';
export class Enemies {
    async promptAttack() {
        const promptPosition = await inquirer.prompt([
            {
                type: 'list',
                name: 'attacks',
                message: 'From where you want to attack: ',
                choices: [
                    {
                        name: 'RIGHT',
                        value: '10-RIGHT',
                    },
                    {
                        name: 'LEFT',
                        value: '17-LEFT'
                    },
                    {
                        name: 'HEAD',
                        value: '25-HEAD'
                    }
                ]
            }
        ]);
        return await promptPosition.attacks.split('-');
    }
    async attackOnEnemy(enemy) {
        const points = Math.floor(Math.random() * enemy.healthPoints);
        if (!enemy.selected) {
            this.selectEnemy(enemy);
        }
        const position = await this.promptAttack();
        if (position) {
            const roundPoint = Number(position[0]);
            const roundSide = position[1];
            console.log(chalk.bgBlue(`\n   You attack on ${roundSide} side.`));
            if (roundPoint < points) {
                console.log(chalk.bgMagentaBright(`\n    OOH, ${enemy.selected} has safe himself from attack.\n`));
            }
            if (roundPoint > points) {
                console.log(chalk.bgGreen(`\n   YEAH, You successfully attacked on ${enemy.selected}.\n`));
                enemy.healthPoints -= roundPoint;
            }
            console.log(chalk.black.yellowBright(`    ${chalk.bold(enemy.selected)}'s health points: ${enemy.healthPoints}\n`));
            if (enemy.healthPoints < 0) {
                console.log(`${chalk.bgHex('#dc6515').white(`WOW, You just kill ${enemy.selected} !!!`)}`);
                this.enemyDied(enemy);
                this.selectEnemy(enemy);
                if (enemy.opponents.length > 0) {
                    this.generateReciept(enemy);
                    this.attackOnEnemy(enemy);
                }
                else {
                    this.gameWinner();
                    const options = await this.gameInterval();
                    this.processGame(options);
                }
            }
            else {
                this.attackOnEnemy(enemy);
            }
        }
    }
    generateReciept(enemy) {
        console.log(`
        ${chalk.cyan('You successfully destroyed your enemy.')}
        ${enemy.died.map((d, i) => chalk.yellowBright(`    ${i + 1}: ${d}`))}
        \n
         ${chalk.cyan('Your remaining Enemies')}
         ${enemy.opponents.map((e, i) => chalk.yellowBright(`   ${i + 1}: ${e}`))}
        `);
        console.log(chalk.bgBlue(`
            Let's destroyed them as well 😈😈\n`));
    }
    enemyDied(enemy) {
        enemy.healthPoints = 0;
        enemy.opponents.pop();
        enemy.died.push(enemy.selected);
        enemy.selected = '';
    }
    selectEnemy(enemy) {
        enemy.opponents.forEach(name => {
            if (!enemy.died.includes(name)) {
                enemy.selected = name;
            }
        });
        enemy.healthPoints = 50;
    }
}
