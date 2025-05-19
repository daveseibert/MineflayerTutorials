import mineflayer from 'mineflayer';
import chalk from 'chalk';
import minecraft_args from './lib/bot.js'
const botArgs = minecraft_args

// Setup bot connection
const initBot = () => {

    // Setup bot connection
    let bot = mineflayer.createBot(botArgs);

    bot.on('login', () => {
        let botSocket = bot._client.socket;
        console.log(`Logged in to ${botSocket.server ? botSocket.server : botSocket._host}`);
    });

    bot.on('end', () => {
        console.log(`Disconnected`);

        // Attempt to reconnect
        setTimeout(initBot, 5000);
    });

    bot.on('error', (err) => {
        if (err.code === 'ECONNREFUSED') {
            console.log(`Failed to connect to ${err.address}:${err.port}`)
        }
        else {
            console.log(`Unhandled error: ${err}`);
        }
    });
};

const quittingBot = () => {

    // Setup bot connection
    let bot = mineflayer.createBot(botArgs);

    bot.on('login', () => {
        let botSocket = bot._client.socket;
        console.log(`Logged in to ${botSocket.server ? botSocket.server : botSocket._host}`);
    });

    bot.on('end', () => {
        console.log(`Disconnected`);

        // Attempt to reconnect
        setTimeout(initBot, 5000);
    });

    bot.on('spawn', async () => {
        console.log("Spawned in");
        bot.chat("Hello!");

        await bot.waitForTicks(60);
        bot.chat("Goodbye");
        bot.quit();
    });

    bot.on('error', (err) => {
        if (err.code === 'ECONNREFUSED') {
            console.log(`Failed to connect to ${err.address}:${err.port}`)
        }
        else {
            console.log(`Unhandled error: ${err}`);
        }
    });
};

class MCBot {

    // Constructor
    constructor(username) {
        this.username = username;
        this.host = botArgs["host"];
        this.port = botArgs["port"];
        this.version = botArgs["version"];

        this.initBot();
    }

    log(...msg) {
        console.log(`[${this.username}]`, ...msg);
    }

    // Init bot instance
    initBot() {
        this.bot = mineflayer.createBot({
            "username": this.username,
            "host": this.host,
            "port": this.port,
            "version": this.version
        });

        this.initEventsColor()
    }

    // Init bot events
    initEvents() {
        this.bot.on('login', () => {
            let botSocket = this.bot._client.socket;
            console.log(`[${this.username}] Logged in to ${botSocket.server ? botSocket.server : botSocket._host}`);
        });

        this.bot.on('end', (reason) => {
            console.log(`[${this.username}] Disconnected: ${reason}`);

            if (reason == "disconnect.quitting") {
                return
            }

            // Attempt to reconnect
            setTimeout(() => this.initBot(), 5000);
        });

        this.bot.on('spawn', async () => {
            console.log(`[${this.username}] Spawned in`);
            this.bot.chat("Hello!");

            await this.bot.waitForTicks(60);
            this.bot.chat("Goodbye");
            this.bot.quit();
        });

        this.bot.on('error', (err) => {
            if (err.code == 'ECONNREFUSED') {
                console.log(`[${this.username}] Failed to connect to ${err.address}:${err.port}`)
            }
            else {
                console.log(`[${this.username}] Unhandled error: ${err}`);
            }
        });
    }
    initEventsColor() {
        this.bot.on('login', () => {
            let botSocket = this.bot._client.socket;
            this.log(chalk.ansi256(34)(`Logged in to ${botSocket.server ? botSocket.server : botSocket._host}`));
        });

        this.bot.on('end', (reason) => {
            this.log(chalk.red(`Disconnected: ${reason}`));

            if (reason == "disconnect.quitting") {
                return
            }

            // Attempt to reconnect
            setTimeout(() => this.initBot(), 5000);
        });

        this.bot.on('spawn', async () => {
            this.log(chalk.ansi256(46)(`Spawned in`));
            this.bot.chat("Hello!");

            await this.bot.waitForTicks(60);
            this.bot.chat("Goodbye");
            this.bot.quit();
        });

        this.bot.on('error', (err) => {
            if (err.code == 'ECONNREFUSED') {
                this.log(`Failed to connect to ${err.address}:${err.port}`)
            }
            else {
                this.log(`Unhandled error: ${err}`);
            }
        });
    }
}

let bots = [];
for(var i = 0; i < 6; i++) {
    bots.push(new MCBot(`Hello_world_${i}`))
}
