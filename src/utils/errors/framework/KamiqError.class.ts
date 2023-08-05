import chalk from 'chalk';
import boxen from 'boxen';

export class KamiqError extends Error {
    constructor(type: string, message: string, suggestion?: string) {
        const errorMessage = 
            '\n'
            + chalk.bold.whiteBright(`${type}:\n`)
            + chalk.white(`${message}\n\n`)
            + chalk.green(`Suggestion: ${suggestion}\n`)
            + '\n'

        const boxenOptions = {
            padding: 1,
            margin: 1,
            borderColor: 'blue',
            backgroundColor: 'black',
            title: 'Kamiq encountered an error!',
            titleAlignment: 'left'
        };

        // TODO: Figure out why TS doesn't want this
        // @ts-ignore
        super(boxen(errorMessage, boxenOptions));
        Object.setPrototypeOf(this, new.target.prototype);
    }
}