import Character from "./character.js";

class Assassin extends Character {
    constructor(name, is_human, hp = 10, mana = 20, dmg = 6) {
      super(name, is_human, hp, mana, dmg);
      this.buffState = "off";
      this.buff = false;
    }
  
    castShadowHit(victim) {
      if (this.mana < 20) {
        console.log("Your mana is too low !");
      } else {
        this.mana = this.mana -= 20;
        this.dmg = 7;
        this.dealDamage(victim);
        console.log(`${this.name} make a Shadow Hit ! `);
        if (victim.hp > 0) {
          this.takeDamage(7);
          console.log(`because ${victim.name} is not dead after the Shadow Hit`);
        } else {
          console.log(`Shadow hit is very effective !`);
        }
        this.dmg = 6;
      }
      this.buffState = "on";
    }
  }

  export default Assassin;