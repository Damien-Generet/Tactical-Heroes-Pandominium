

// Character is the global class and have some default attribute and function for ALL character
class Character {
    constructor(name, is_human, hp, mana, dmg) {
      this.name = name;
      this.hp = hp;
      this.dmg = dmg;
      this.mana = mana;
      this.is_human = is_human;
      this.state = "playing";
    }
  
    takeDamage(damage) {
      // this reffer to the victim in dealDamageFFunction
      if (this.hp < damage) {
        this.hp = 0;
        console.log(`${this.name} has now ${this.hp} hp ! Ouch...`);
        this.updateStatu();
      } else {
        this.hp = this.hp -= damage;
        console.log(`${this.name} has now ${this.hp} hp ! Ouch...`);
        this.updateStatu();
      }
    }
  
    dealDamage(victim) {
      // check if the victim is already loser
      if (victim.state === "loser") {
        console.log(`${victim.name} is alredy dead. Choose another ennemy !`);
        // if the victim is alive, we do the attack
      } else {
        // this reffer to the charachter how make the attak
        if (victim.constructor.name === "Fighter" && victim.buff === true) {
          console.log(
            `${this.name} attak ${victim.name} and deal ${
              this.dmg - 2
            } damages ! 2 damages less !`
          );
          // Fighter buff is ON so he take 2dmg less for each attack on this turn
          victim.takeDamage(this.dmg - 2);
        } else if (victim.constructor.name === "Assassin" && victim.buff === true)
          console.log(
            `${this.name} attak ${victim.name} but ${victim.name} have a protection against damage ! (Shadow Hit)`
          );
        else {
          console.log(
            `${this.name} attak ${victim.name} and deal ${this.dmg} damages !`
          );
          // call the take damage function where this gonna be the victim
          victim.takeDamage(this.dmg);
        }
  
        if (victim.state === "loser") {
          this.mana = this.mana += 20;
          console.log(
            `${this.name} just kill an ennemy ! you win 20 points of mana ! mana : ${this.mana}`
          );
        }
      }
    }
  
    updateStatu() {
      if (this.hp === 0) {
        this.state = "loser";
        console.log(`${this.name} is now loser. LOSER !`);
      }
    }
  
    setBuff(state) {
      if (state === "on") {
        this.buff = true;
      } else {
        this.buff = false;
      }
    }
  }

  export default Character;