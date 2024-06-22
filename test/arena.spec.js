const Player = require('../src/models/player');
const Arena = require('../src/models/arena');


describe('Arena Class', () => {
    let player1;
    let player2;

    beforeEach(() => {
        player1 = new Player('Hero1', 100, 20, 30);
        player2 = new Player('Hero2', 100, 20, 30);
    });

    afterEach(() => {
        jest.restoreAllMocks(); // Restore mocks created by Jest
    });

    it('should return a number between 1 and 6 when rollDice is called', () => {
        const roll = Arena.rollDice();
        expect(roll).toBeGreaterThanOrEqual(1);
        expect(roll).toBeLessThanOrEqual(6);
    });

    it('should not allow negative health', () => {
        player1.takeDamage(150);
        expect(player1.health).toBe(0);
    });

    it('should handle zero attack', () => {
        player1.attack = 0;
        const winner = Arena.fight(player1, player2);
        expect(player2.health).toBeGreaterThan(0);
    });

    it('should handle maximum number of iterations', () => {
        const rollDiceMock = jest.spyOn(Arena, 'rollDice');
        rollDiceMock.mockReturnValue(1);
        player1.attack = 1;
        player2.strength = 1;
        player2.attack = 1;
        player1.strength = 1;

        const winner = Arena.fight(player1, player2);
        expect(winner).toBeNull(); // Indicating a draw
    });

    it('should validate player attributes within the allowed range', () => {
        expect(() => new Player('Hero', -10, 20, 30)).toThrow('Health must be between 0 and 1000');
        expect(() => new Player('Hero', 100, -5, 30)).toThrow('Attack must be between 0 and 100');
        expect(() => new Player('Hero', 100, 20, 150)).toThrow('Strength must be between 0 and 100');
    });

    it('should let Hero1 win the fight', () => {
        const rollDiceMock = jest.spyOn(Arena, 'rollDice');
        rollDiceMock.mockReturnValueOnce(6);  // Hero1's attack
        rollDiceMock.mockReturnValueOnce(1);  // Hero2's defend
        rollDiceMock.mockReturnValueOnce(2);  // Hero2's attack
        rollDiceMock.mockReturnValueOnce(5);  // Hero1's defend
        rollDiceMock.mockReturnValueOnce(5);  // Hero1's attack
        rollDiceMock.mockReturnValueOnce(1);  // Hero2's defend
        rollDiceMock.mockReturnValueOnce(1);  // Hero1's attack
        rollDiceMock.mockReturnValueOnce(6);  // Hero2's defend

        const winner = Arena.fight(player1, player2);
        expect(player1.health).toBeGreaterThan(0); 
        expect(player2.health).toBeLessThanOrEqual(0);
        expect(winner).toBe(player1);
    });

    it('should let Hero2 win the fight', () => {
        const rollDiceMock = jest.spyOn(Arena, 'rollDice');
        rollDiceMock.mockReturnValueOnce(2);  // Hero1's attack
        rollDiceMock.mockReturnValueOnce(6);  // Hero2's defend
        rollDiceMock.mockReturnValueOnce(6);  // Hero2's attack
        rollDiceMock.mockReturnValueOnce(1);  // Hero1's defend
        rollDiceMock.mockReturnValueOnce(1);  // Hero1's attack
        rollDiceMock.mockReturnValueOnce(5);  // Hero2's defend
        rollDiceMock.mockReturnValueOnce(5);  // Hero1's attack
        rollDiceMock.mockReturnValueOnce(1);  // Hero2's defend

        const winner = Arena.fight(player1, player2);
        expect(player2.health).toBeGreaterThan(0); 
        expect(player1.health).toBeLessThanOrEqual(0);
        expect(winner).toBe(player2);
    });
});
