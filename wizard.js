import Character from "./character.js";

class Wizard extends Character {
    constructor(name, is_human, hp = 9, mana = 200, dmg = 5) {
      super(name, is_human, hp, mana, dmg);
      this.buffState = "off";
      this.buff = false;
    }
  
    fireBall(victim) {
      if (this.mana < 200) {
        console.log("your mana is too low !");
      } else {
        this.dmg = 8;
        this.mana = this.mana -= 25;
        console.log(
          `${this.name} cast a HUUUGE fire ball ! mana -25 : ${this.mana}`
        );
        this.dealDamage(victim);
        this.dmg = 5;
      }
    }
  }

  export default Wizard;