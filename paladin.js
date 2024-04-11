import Character from "./character.js";

class Paladin extends Character {
    constructor(name, is_human, hp = 16, mana = 160, dmg = 3) {
      super(name, is_human, hp, mana, dmg);
    }
    // make 4damage and heal 5hp. after the dealDamage function, we restore the dmg
    castHealingLighting(victim) {
      if (this.mana < 40) {
        console.log("your mana is too low");
      } else {
        this.dmg = 4;
        this.mana = this.mana -= 40;
        if(this.hp += 5 > 16){
            this.hp = 16
        } else {
            this.hp = this.hp += 5;
        }
        console.log(
          `${this.name} cast a holy light of heal (hp +5 : ${this.hp}) and burn the enemy ! mana -40 : ${this.mana}`
        );
        this.dealDamage(victim);
        this.dmg = 3;
      }
    }
  }

  export default Paladin;