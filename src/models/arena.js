// const Player=require('./player')

class Arena{
    static rollDice(){
        return Math.floor(Math.random()*6)+1
    }

    static fight(player1,player2){
        let attacker=player1.health<=player2.health?player1:player2
        let defender=attacker===player1?player2:player1

        while(player1.isAlive()&&player2.isAlive()){
            const attackRoll=Arena.rollDice()
            const defendRoll=Arena.rollDice()

            const damage=attacker.attack*attackRoll
            const defend=defender.strength*defendRoll

            const damageDone=Math.max(0,damage-defend)

            defender.health-=damageDone

            console.log(`${attacker.name} attacks ${defender.name} for ${damage} (Defend: ${defend}). ${defender.name}'s health is now ${defender.health}`);

            [attacker,defender]=[defender,attacker]
        }
        const winner=player1.isAlive()?player1:player2
        return winner
    }
}


// module.exports=Arena
export default Arena