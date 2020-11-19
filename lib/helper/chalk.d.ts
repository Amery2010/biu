import chalk from 'chalk';
export declare const success: chalk.Chalk;
export declare const error: chalk.Chalk;
export declare const warning: chalk.Chalk;
declare const _default: chalk.Chalk & chalk.ChalkFunction & {
    supportsColor: false | chalk.ColorSupport;
    Level: chalk.Level;
    Color: "yellow" | "black" | "red" | "green" | "blue" | "magenta" | "cyan" | "white" | "gray" | "grey" | "blackBright" | "redBright" | "greenBright" | "yellowBright" | "blueBright" | "magentaBright" | "cyanBright" | "whiteBright" | "bgBlack" | "bgRed" | "bgGreen" | "bgYellow" | "bgBlue" | "bgMagenta" | "bgCyan" | "bgWhite" | "bgGray" | "bgGrey" | "bgBlackBright" | "bgRedBright" | "bgGreenBright" | "bgYellowBright" | "bgBlueBright" | "bgMagentaBright" | "bgCyanBright" | "bgWhiteBright";
    ForegroundColor: "yellow" | "black" | "red" | "green" | "blue" | "magenta" | "cyan" | "white" | "gray" | "grey" | "blackBright" | "redBright" | "greenBright" | "yellowBright" | "blueBright" | "magentaBright" | "cyanBright" | "whiteBright";
    BackgroundColor: "bgBlack" | "bgRed" | "bgGreen" | "bgYellow" | "bgBlue" | "bgMagenta" | "bgCyan" | "bgWhite" | "bgGray" | "bgGrey" | "bgBlackBright" | "bgRedBright" | "bgGreenBright" | "bgYellowBright" | "bgBlueBright" | "bgMagentaBright" | "bgCyanBright" | "bgWhiteBright";
    Modifiers: "reset" | "bold" | "dim" | "italic" | "underline" | "inverse" | "hidden" | "strikethrough" | "visible";
    stderr: chalk.Chalk & {
        supportsColor: false | chalk.ColorSupport;
    };
} & {
    success: chalk.Chalk;
    ok: chalk.Chalk;
    error: chalk.Chalk;
    fail: chalk.Chalk;
    warning: chalk.Chalk;
    warn: chalk.Chalk;
};
export default _default;
