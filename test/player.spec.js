
const Player = require('../src/models/player');

describe('Player Class', () => {
    let player;

    beforeEach(() => {
        player = new Player('Hero1', 100, 20, 50);
    });

    test('should create a player with the given properties', () => {
        expect(player.name).toBe('Hero1');
        expect(player.health).toBe(100);
        expect(player.attack).toBe(20);
        expect(player.strength).toBe(50);
    });

    test('should return true if the player is alive', () => {
        expect(player.isAlive()).toBe(true);
    });

    test('should return false if the player is not alive', () => {
        player.health = 0;
        expect(player.isAlive()).toBe(false);
    });

    test('should return false if the player health is negative', () => {
        player.health = -10;
        expect(player.isAlive()).toBe(false);
    });
});