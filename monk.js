import Character from "./character.js";

class Monk extends Character {
    constructor(name, is_human, hp = 8, mana = 200, dmg = 2) {
      super(name, is_human, hp, mana, dmg);
    }
    //simple heal so add 8hp
    castHeal() {
      if (this.mana < 25) {
        console.log("Your mana is too low !");
      } else {
        this.hp = this.hp += 8;
        if (this.hp > 8) {
          this.hp = 8;
        }
        this.mana = this.mana -= 25;
        console.log(
          `${this.name} cast a healing spell ! hp +8 : ${this.hp} | mana -25 : ${this.mana}`
        );
      }
    }
  }
  

  export default Monk;