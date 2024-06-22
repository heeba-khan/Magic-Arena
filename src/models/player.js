class Player{
    constructor(name,health,attack,strength){
        if (health < 0 || health > 1000) throw new Error('Health must be between 0 and 1000');
        if (attack < 0 || attack > 100) throw new Error('Attack must be between 0 and 100');
        if (strength < 0 || strength > 100) throw new Error('Strength must be between 0 and 100');

        this.name=name
        this.health=health
        this.attack=attack
        this.strength=strength
    }

    takeDamage(damage){
        this.health=Math.max(this.health-damage,0)
    }

    isAlive(){
        return this.health>0
    }
}

module.exports=Player
// export default Player
