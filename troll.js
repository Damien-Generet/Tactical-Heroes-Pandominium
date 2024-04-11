import Character from "./character.js";

class Troll extends Character {
    constructor(name, is_human, hp = 25, mana = 0, dmg = 1) {
      super(name, is_human, hp, mana, dmg);
      this.buffState = "off";
      this.buff = false;
    }
  
    // do 5dmg with this attack just for one turn, so we changeg the damage to 5 and after the dealdamage function, dmg is restored
    beSmart() {
     console.log("GNI GNI ME NOT HAPPY ! ME IS SMART")
     console.log("The troll is frustrated by the fact that he is not smart... He gain 3dmg")
     this.dmg = 4;
    }
  }

  export default Troll;