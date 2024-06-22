class Player{
    constructor(name,health,strength,attack){
        if (health < 0 || health > 1000) throw new Error('Health must be between 0 and 1000');
        if (strength < 0 || strength > 100) throw new Error('Strength must be between 0 and 100');
        if (attack < 0 || attack > 100) throw new Error('Attack power must be between 0 and 100');

        this.name=name
        this.health=health
        this.strength=strength
        this.attack=attack
    }

    isAlive(){
        return this.health>0
    }
}

// module.exports=Player
export default Player
