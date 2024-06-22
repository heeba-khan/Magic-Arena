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
