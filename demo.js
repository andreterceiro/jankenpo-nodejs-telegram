const TelegramBot = require( `node-telegram-bot-api` )

const TOKEN = `6653221258:AAEbzItNUCp8et4n3oA1dfg7JwmkTc6cS5k`

const bot = new TelegramBot( TOKEN, { polling: true } )

bot.on('message', function(userMessage){
    console.log(userMessage.text.toLowerCase() == "rock")
})