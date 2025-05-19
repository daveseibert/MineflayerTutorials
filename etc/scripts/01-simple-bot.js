const mineflayer = require('mineflayer');

// Setup bot connection
const bot = mineflayer.createBot({
  host: process.env.MINECRAFT_HOST,
  port: process.env.MINECRAFT_PORT,
  username: process.env.MINECRAFT_USERNAME,
  version: process.env.MINECRAFT_VERSION,
});
