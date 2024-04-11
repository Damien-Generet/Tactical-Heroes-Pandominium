import Character from "./character.js";

class Fighter extends Character {
    constructor(name, is_human, hp = 12, mana = 40, dmg = 4) {
      super(name, is_human, hp, mana, dmg);
      this.buffState = "off";
      this.buff = false;
    }
  
    // do 5dmg with this attack just for one turn, so we changeg the damage to 5 and after the dealdamage function, dmg is restored
    castDarkVision(victim) {
      if (this.mana < 20) {
        console.log("your mana is too low !");
      } else {
        this.dmg = 5;
        this.mana = this.mana -= 20;
        console.log(
          `${this.name} cast the Dark Vision attack ! mana -20 : ${this.mana}`
        );
        this.dealDamage(victim);
        this.dmg = 4;
      }
      this.buffState = "on";
    }
  }

  export default Fighter;