const TelegramBot = require( `node-telegram-bot-api` )

const TOKEN = process.env.TOKEN_JANKENPO_TELEGRAM

const bot = new TelegramBot( TOKEN, { polling: true } )

// event invoked on every message
bot.on('message', function(userMessage){
    let stringUserOption = userMessage.text.toLowerCase();

    if (stringUserOption != "paper" && stringUserOption != "rock" && stringUserOption != "scissors") {
        sendMessageToUser("Please type 'paper', 'rock' or 'scissors'", userMessage);
        return;
    }

    const stringComputerOption = getStringComputerOption();

    if ((stringUserOption == "paper" && stringComputerOption == "rock") || (stringUserOption == "rock" && stringComputerOption == "scissors") || (stringUserOption == "scissors" && stringComputerOption == "paper")) {
        sendMessageToUser("User win", userMessage);
    } else if (stringUserOption == stringComputerOption) {
        sendMessageToUser("Draw", userMessage);
    } else {
        sendMessageToUser("Computer wins", userMessage);
    }

    sendMessageToUser(`Computer selected: ${stringComputerOption}`, userMessage);
    sendMessageToUser(`User selected: ${stringUserOption}`, userMessage);
    sendMessageToUser("Please send a new option to play again", userMessage);
})

/**
 * Return a string related to a random computer option
 * 
 * @returns {string}
 */
function getStringComputerOption() {
    const integerComputerOption = Math.ceil(Math.random() * 3);

    if (integerComputerOption == 1) {
        return "paper";
    } else if (integerComputerOption == 2) {
        return "rock";
    }
    return "scissors";
}

/**
 * Send a message (first parameter to user)
 * The second parameter needs to be the message like the message sent to 
 * us in the bot.on() event
 * 
 * @param {string} message             String message to send to the user
 * @param {object} userMessageTelegram Message object sent by Telegram to us
 * 
 * @returns {undefined}
 */
function sendMessageToUser(message, userMessageTelegram) {
    if (typeof message != "string") {
        throw new Error("The parameter message needs to be string");
    }

    bot.sendMessage( userMessageTelegram.chat.id, message);
}