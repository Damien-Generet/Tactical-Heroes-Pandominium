// Character is the global class and have some default attribute and function for ALL character
class Character {
    constructor(name, hp, mana, dmg) {
        this.name = name
        this.hp = hp;
        this.dmg = dmg;
        this.mana = mana;
        this.state = "playing"
    }


    takeDamage(damage){
        // this reffer to the victim in dealDamageFFunction
        if(this.hp < damage){
            this.hp = 0
            console.log(`${this.name} has now ${this.hp} hp ! Ouch...`)
            this.updateStatu() 
        } else {
        this.hp = this.hp -= damage
        console.log(`${this.name} has now ${this.hp} hp ! Ouch...`)
        this.updateStatu() 
            }
    }

    dealDamage(victim){
        // check if the victim is already loser
        if(victim.state === "loser"){
           console.log(`${victim.name} is alredy dead. Choose another ennemy !`)  
           // if the victim is alive, we do the attack
        } else {
        // this reffer to the charachter how make the attak
            if(victim.name === "Grace" && victim.buff === true){
                console.log(`${this.name} attak ${victim.name} and deal ${this.dmg - 2} damages ! 2 damages less !`)
                // Fighter buff is ON so he take 2dmg less for each attack on this turn
                victim.takeDamage(this.dmg - 2)
            } else if(victim.name === "Carl" && victim.buff === true) 
                console.log(`${this.name} attak ${victim.name} but ${victim.name} have a protection against damage ! (Shadow Hit)`)
            else {
        console.log(`${this.name} attak ${victim.name} and deal ${this.dmg} damages !`)
        // call the take damage function where this gonna be the victim
        victim.takeDamage(this.dmg) }

        if(victim.state === "loser"){
            this.mana = this.mana += 20
            console.log(`${this.name} just kill an ennemy ! you win 20 points of mana ! mana : ${this.mana}`)
        }
    } }

    updateStatu(){
        if(this.hp === 0){
            this.state = "loser"
            console.log(`${this.name} is now loser. LOSER !`)
        } 
    } 

    castSpecialAttak(turnLeft, warrior, otherCharacter){

        console.log(warrior);
        if(warrior.name === "Grace"){
            let victimFighter = prompt(`Who do you want to attack ? 1) ${otherCharacter[0].name}, 2) ${otherCharacter[1].name}, 3) ${otherCharacter[2].name}, 4) ${otherCharacter[3].name}`)
                warrior.castDarkVision(victimFighter, turnLeft)
                console.log('special attaque')
           }

           if(warrior.name === "Ulder"){
            let victimPaladin = prompt(`Who do you want to attack ? 1) ${otherCharacter[0].name}, 2) ${otherCharacter[1].name}, 3) ${otherCharacter[2].name}, 4) ${otherCharacter[3].name}`)
                    warrior.castHealingLighting(victimPaladin)
                    console.log('special attaque')
           }

           if(warrior.name === "Moana"){
                    warrior.castHeal()
                    console.log('special attaque')
           }

           if(warrior.name === "Draven"){
                    warrior.castRage()
                    console.log('special attaque')
           }

           if(warrior.name === "Carl"){
            
                    warrior.castShadowHit(victim, turnLeft)
                    console.log('special attaque')
           }
    }

    setBuff(state){
        if(state === "on"){
            this.buff = true;
        } else{
            this.buff = false;
        }
    }
}

// Fighter class
class Fighter extends Character{
    constructor(name, hp = 12, mana = 40, dmg = 4) {
        super(name, hp, mana, dmg)
        this.buffState = "off"
        this.buff = false;
    }

    // do 5dmg with this attack just for one turn, so we changeg the damage to 5 and after the dealdamage function, dmg is restored
    castDarkVision(victim){
        if( this.mana < 20){
            console.log("your mana is too low !")
        } else {
        this.dmg = 5
        this.mana = this.mana -= 20
        console.log(`${this.name} cast the Dark Vision attack ! mana -20 : ${this.mana}`)
        this.dealDamage(victim)
        this.dmg = 4 }
        this.buffState = "on"
    }
}

// Paladin class.
class Paladin extends Character{
    constructor(name, hp = 16, mana = 160, dmg = 3) {
        super(name, hp, mana, dmg)
    }
// make 4damage and heal 5hp. after the dealDamage function, we restore the dmg
    castHealingLighting(victim){
        if(this.mana < 40){
            console.log("your mana is too low")
        } else {
        this.dmg = 4
        this.mana = this.mana -= 40
        this.hp = this.hp += 5
        console.log(`${this.name} cast a holy light of heal (hp +5 : ${this.hp}) and burn the enemy ! mana -40 : ${this.mana}`)
        this.dealDamage(victim)
        this.dmg = 3 }
    }
}


// Monk class.
class Monk extends Character{
    constructor(name, hp = 8, mana = 200, dmg = 2) {
        super(name, hp, mana, dmg)
    }
    //simple heal so add 8hp
    castHeal(){
        if(this.mana < 25){
            console.log("Your mana is too low !")
        } else {
        this.hp = this.hp += 8
        if(this.hp > 8){
            this.hp = 8
        }
        this.mana = this.mana -= 25
        console.log(`${this.name} cast a healing spell ! hp +8 : ${this.hp} | mana -25 : ${this.mana}`)
    }}
}


// class berzerker
class Berzerker extends Character{
    constructor(name, hp = 8, mana = 0, dmg = 4){
        super(name, hp, mana, dmg)
    }
    // add 1 dmg and loose 1hp
    castRage(){
        this.hp = this.hp -=1
        this.dmg = this.dmg +=1
        console.log(`${this.name} cast Rage ! He loose -1hp (now : ${this.hp} and have +1 damage : ${this.dmg})`)
    }
}

// class Assassin
class Assassin extends Character{
    constructor(name, hp = 10, mana = 20, dmg = 6){
        super(name, hp, mana, dmg)
        this.buffState = "off"
        this.buff = false;
    }

    castShadowHit(victim, turnLeft){
        if(this.mana < 20){
            console.log("Your mana is too low !")
        } else {
        this.mana = this.mana -= 20
        this.dmg = 7
        this.dealDamage(victim)
        console.log(`${this.name} make a Shadow Hit ! `)
        if(victim.hp > 0){
            this.takeDamage(7)
            console.log(`because ${victim.name} is not dead after the Shadow Hit`)
        } else {console.log(`Shadow hit is very effective !`)}
        this.dmg = 6 }
        this.buffState = "on"
    }
}


class Game{
    constructor(turnLeft = 3){
    this.turnLeft = turnLeft
    }

    startTurn(){
        console.log(`It's turn ${this.turnLeft}`)
        this.whoPlay()
        setBuff()
    }

    whoPlay(){
        let randomCharacter = allCharacter.filter((warrior) => warrior.hp > 0)
        console.log(randomCharacter)
        for (let i = randomCharacter.length -1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [randomCharacter[i], randomCharacter[j]] = [randomCharacter[j], randomCharacter[i]]
        }
        randomCharacter.forEach(warrior => {
            console.log(`It's the turn of ${warrior.name} to play !`)
            this.characterAction(warrior)
        })

        this.skipTurn()
    }

    characterAction(warrior){
       let otherCharacter = allCharacter.filter(character => character !== warrior)
        console.log("Choose an action !")
        console.log(warrior.constructor.name)
        let choice = prompt("What do you want to do ? 1) Simple Attack | 2) Special Attack")

        switch(choice){
            case "1":
                let victimToAttak = prompt(`Who do you want to attack ? 1) ${otherCharacter[0].name}, 2) ${otherCharacter[1].name}, 3) ${otherCharacter[2].name}, 4) ${otherCharacter[3].name}`)
                warrior.dealDamage(otherCharacter[victimToAttak - 1])
                break;
            case "2":
                    warrior.castSpecialAttak(this.turnLeft, warrior, otherCharacter)
                break;
        }
    }


    skipTurn(){
        this.turnLeft -= 1
        console.log("test")
        if(this.turnLeft === 0){
            this.GameOver()
        } else {
            allCharacter.find((warrior) => warrior.name === "Grace").setBuff(allCharacter.find((warrior) => warrior.name === "Grace").buffState)
            allCharacter.find((warrior) => warrior.name === "Carl").setBuff(allCharacter.find((warrior) => warrior.name === "Carl").buffState)
            allCharacter.find((warrior) => warrior.name === "Grace").buffState = "off"
            allCharacter.find((warrior) => warrior.name === "Carl").buffState = "off"
            this.startTurn()
        }
    }

    GameOver(){
        allCharacter.forEach(warrior => {
            if(warrior.hp > 0){
                console.log(`Congratulation ${warrior.name}, you win !`)
            } else {
                console.log(`Maybe next Time ${warrior.name}`)
            }
        });
    }

    

}

const game = new Game()

let allCharacter = []
const grace = new Fighter("Grace")
allCharacter.push(grace)
const ulder = new Paladin("Ulder")
allCharacter.push(ulder)
const moana = new Monk("Moana")
allCharacter.push(moana)
const draven = new Berzerker("Draven")
allCharacter.push(draven)
const carl = new Assassin("Carl")
allCharacter.push(carl)

console.log(grace)
console.log(ulder)
console.log(moana)
console.log(draven)
console.log(carl)
game.startTurn()
