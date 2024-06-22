
// import Player from './models/player.js'
// import Arena from './models/arena.js'
// import readline from 'readline'

const Player=require('./models/player')
const Arena=require('./models/arena')
const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getPlayerAttributes = (playerName, callback) => {
    rl.question(`Enter health, strength, and attack for ${playerName} (comma-separated): `, (input) => {
        const attributes = input.split(',').map(Number);
        if (attributes.length === 3 && attributes.every(attr => !isNaN(attr) && attr > 0)) {
            callback(new Player(playerName, ...attributes));
        } else {
            console.log('Invalid input. Please enter positive integers for health, strength, and attack.');
            getPlayerAttributes(playerName, callback); // Reprompt for input
        }
    });
};

getPlayerAttributes('Player A', (playerA) => {
    getPlayerAttributes('Player B', (playerB) => {
        const winner = Arena.fight(playerA, playerB);
        console.log(`The winner is ${winner.name} with ${winner.health} health remaining.`);
        rl.close();
    });
});

