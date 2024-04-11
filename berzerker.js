import Character from "./character.js";

class Berzerker extends Character {
    constructor(name, is_human, hp = 8, mana = 0, dmg = 4) {
      super(name, is_human, hp, mana, dmg);
    }
    // add 1 dmg and loose 1hp
    castRage() {
      this.hp = this.hp -= 1;
      this.dmg = this.dmg += 1;
      console.log(
        `${this.name} cast Rage ! He loose -1hp (now : ${this.hp} and have +1 damage : ${this.dmg})`
      );
    }
  }

export default Berzerker;