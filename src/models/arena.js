// const Player=require('./player')

class Arena{
    static rollDice(){
        return Math.floor(Math.random()*6)+1
    }

    static calculateDamage(player1,player2){
        let attacker=player1.health<=player2.health?player1:player2
        let defender=attacker===player1?player2:player1

        while(player1.isAlive()&&player2.isAlive()){
        const attackRoll=Arena.rollDice()*attacker.attack
        const defendRoll=Arena.rollDice()*defender.strength
        return Math.max(attackRoll-defendRoll,0)
        }
        return 0
    }

    static fight(player1,player2){
        // let attacker=player1.health<=player2.health?player1:player2
        // let defender=attacker===player1?player2:player1

        // while(player1.isAlive()&&player2.isAlive()){
        //     const attackRoll=Arena.rollDice()
        //     const defendRoll=Arena.rollDice()

        //     const damage=attacker.attack*attackRoll
        //     const defend=defender.strength*defendRoll

        //     const damageDone=Math.max(0,damage-defend)

        //     defender.health-=damageDone

        //     console.log(`${attacker.name} attacks ${defender.name} for ${damage} (Defend: ${defend}). ${defender.name}'s health is now ${defender.health}`);

        //     [attacker,defender]=[defender,attacker]
        // }

        const maxRounds = 100;
        let rounds = 0;
        
        while (player1.health > 0 && player2.health > 0 && rounds < maxRounds) {
            const damageToPlayer2 = Arena.calculateDamage(player1, player2);
            const damageToPlayer1 = Arena.calculateDamage(player2, player1);
            
            player2.takeDamage(damageToPlayer2);
            player1.takeDamage(damageToPlayer1);
            
            rounds++;
        }
        
        if (rounds >= maxRounds) {
            return null; // Indicates a draw if the maximum number of rounds is reached
        }
        const winner=player1.isAlive()?player1:player2
        return winner
    }
}


module.exports=Arena
// export default Arena