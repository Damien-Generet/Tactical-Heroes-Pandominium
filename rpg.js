import Assassin from "./assassin.js";
import Monk from "./monk.js";
import Paladin from "./paladin.js";
import Fighter from "./fighter.js";
import Berzerker from "./berzerker.js";
import Wizard from "./wizard.js";
import Troll from "./troll.js";

// define the btn start button
let startBtn = document.getElementById("start-btn");
let allCharacter = [];
const aiNames = ["Grace", "Ulder", "Moana", "Draven", "Carl", "Putin", "Macron", "Stalin", "Kayla", "Jésus", "Léon", "Léonard"];

// start when we click on the btn start button
startBtn.addEventListener("click", () => {
  const newgame = new Game();
  newgame.setPlayer();
  newgame.setAiPlayer();
  newgame.startTurn();
});

// just a sleep function
setTimeout(function() {
}, 3000);

class Game {
  constructor(turnLeft = 10) {
    this.turnLeft = turnLeft;
  }

  sleep(ms) {
    const dateDebut = Date.now();
    let dateActuelle = null;
    do {
        dateActuelle = Date.now();
    } while (dateActuelle - dateDebut < ms);
  }

  // set the player with a prompt
  setPlayer() {
    let is_human = true;
    let classPlayable = [Fighter, Paladin, Monk, Berzerker, Assassin, Wizard, Troll];
    console.log("1) Fighter, 2) Paladin, 3) Monk, 4) Berzerker, 5) Assassin, 6) Wizard, 7) Troll");
    let name = prompt("What is your name?");
    let choice = prompt("What is your class?");
    let classPlayer = classPlayable[choice - 1];
    allCharacter.push(new classPlayer(name, is_human));
  }

  // set all ai characters
  setAiPlayer() {
    let is_human = false;
    let allPlayableClass = [];
    allPlayableClass.push(new Fighter(aiNames[Math.floor(Math.random() * aiNames.length)], is_human));
    allPlayableClass.push(new Paladin(aiNames[Math.floor(Math.random() * aiNames.length)], is_human));
    allPlayableClass.push(new Monk(aiNames[Math.floor(Math.random() * aiNames.length)], is_human));
    allPlayableClass.push(new Berzerker(aiNames[Math.floor(Math.random() * aiNames.length)], is_human));
    allPlayableClass.push(new Assassin(aiNames[Math.floor(Math.random() * aiNames.length)], is_human));
    allPlayableClass.push(new Wizard(aiNames[Math.floor(Math.random() * aiNames.length)], is_human));
    allPlayableClass.push(new Troll(aiNames[Math.floor(Math.random() * aiNames.length)], is_human));
    for (let i = 0; i < 4; i++) {
      allCharacter.push(
        allPlayableClass[Math.floor(Math.random() * allPlayableClass.length)]
      );
    }
  }


  startTurn() {
    console.log(`It's turn ${this.turnLeft}`);
    this.whoPlay();
    setBuff();
  }

  whoPlay() {
    let randomCharacter = allCharacter.filter((player) => player.hp > 0);
    console.log(randomCharacter);
    for (let i = randomCharacter.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomCharacter[i], randomCharacter[j]] = [
        randomCharacter[j],
        randomCharacter[i],
      ];
    }
    console.log(randomCharacter);
    randomCharacter.forEach((player) => {
      this.sleep(1000)
      // define if the player is human or AI and if he have Hp
      if (player.hp > 0 && player.is_human === true) {
        console.log("JOUEUR");
        this.characterAction(player);
      }

      if (player.hp > 0 && player.is_human === false) {
        console.log("IA");
        console.log(`It's the turn of ${player.name} to play !`);
        this.aiAction(player);
      }
  })
  this.sleep(1000)
  this.skipTurn();

  }
// Define the action of the AI
  aiAction(player) {
    let aiPossibility = ["1", "2"];
    let aiChoice
    let victimArray = allCharacter.filter((char) => char.hp <= player.dmg && char != player)

    if(victimArray.length >= 1) {
      player.dealDamage(victimArray[Math.floor(Math.random() * victimArray.length)]);
    } else { aiChoice =
      aiPossibility[Math.floor(Math.random() * aiPossibility.length)];
    }
    if(aiChoice === "1") {
      player.dealDamage(this.potentialVictimToAttak(player));
    } else if(aiChoice === "2") {
      this.castSpecialAttak(player);
    }
  }
  // Define the action of the player.
  characterAction(player) {
    console.log("Choose an action !");
    console.log(player.constructor.name);
    console.log("1) Simple Attack");
    console.log("2) Special Attak");
    let choice = prompt("What do you want to do ?");

    switch (choice) {
      case "1":
        player.dealDamage(this.potentialVictimToAttak(player));
        break;
      case "2":
        this.castSpecialAttak(player);
        break;
    }
  }

  // we define who we want to attack first we put all character different of the agressor, and then  we add console log too 
  // show the potential victims and we choose it with a prompt.
  potentialVictimToAttak(player) {
    let potentialVictim = [];
    let i = 0;
    allCharacter.forEach((char) => {
      if (char != player && char.hp > 0) {
        potentialVictim.push(char);
        console.log(
          `${i + 1}) ${char.name} || hp : ${char.hp} || mana : ${char.mana}`
        );
        i += 1;
      }
    });
    if(player.is_human === true) {
    let victim = prompt(`Who do you want to attack ?`);
    return potentialVictim[victim - 1];
    } else{
      return potentialVictim[Math.floor(Math.random() * potentialVictim.length)];
    }
  }

// start the special attack function if we choose it. Depend which class we are playing
  castSpecialAttak(player) {
    console.log(player);
    if (player instanceof Fighter) {
      player.castDarkVision(this.potentialVictimToAttak(player));
      console.log("special attaque");
    }

    if (player instanceof Wizard) {
      player.fireBall(this.potentialVictimToAttak(player));
      console.log("special attaque");
    }

    if (player instanceof Paladin) {
      player.castHealingLighting(this.potentialVictimToAttak(player));
      console.log("special attaque");
    }

    if (player instanceof Monk) {
      player.castHeal();
      console.log("special attaque");
    }

    if (player instanceof Berzerker) {
      player.castRage();
      console.log("special attaque");
    }

    if (player instanceof Troll) {
      player.beSmart();
      console.log("special attaque");
    }

    if (player instanceof Assassin) {
      player.castShadowHit(this.potentialVictimToAttak(player));
      console.log("special attaque");
    }
  }
    // first we check how many turn left. if 0 so game over
  // then, check the state of the game
// this function set the buff on or off for some characther and skip the turn to the next one
  skipTurn() {
    this.turnLeft -= 1;
    if (this.turnLeft === 0) {
      this.GameOver("no more turn");
    } else if (this.checkStateGame(allCharacter)) {
      console.log("END GAME");
    } else {
      allCharacter.forEach((char) => {
        if (char.buffState === "on") {
          char.setBuff(char.buffState);
        } else {
          char.setBuff(char.buffState);
        }
        this.startTurn();
      });
    }
  }

// The game is over if everybody is dead or if we hage only one survivor
  checkStateGame(allCharacter) {
    let allDead = allCharacter.filter((char) => char.hp === 0);
    if (allDead.length === allCharacter.length) {
      this.GameOver("no survivor");
      return true;
    }
    if (allDead.length === allCharacter.length - 1) {
      this.GameOver("one survivor");
      return true;
    }
  }

  GameOver(reason) {
    if (reason === "no more turn") {
      allCharacter.forEach((player) => {
        if (player.hp > 0) {
          console.log(`Congratulation ${player.name}, you win !`);
        } else {
          console.log(`Maybe next Time ${player.name}`);
        }
      });
    }
    if (reason === "one survivor") {
      let lastSurvivor = allCharacter.find((winner) => winner.hp > 0);
      console.log(
        `${lastSurvivor.name} is the last survivor and the BIG WINNER !`
      );
    }

    if (reason === "no survivor") {
      console.log(
        "Wow... It wasn't supposed to happen like this... Do you want to play again ?"
      );
    }
  }
}
