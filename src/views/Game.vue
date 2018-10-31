<template>
  <div class="home">
    <div class="game-header">
      <div class="nav">
        <button @click="startNewGame">New Game</button>
        <button>Settings</button>
      </div>
    	<h1>LCR</h1>
    </div>
    <div class="playarea">
      <Player
        v-for="(score, index) in scores"
        :key="index"
        :dice="diceToDisplay(index)"
        :diceIsRolling="diceIsRolling"
        :score="score"
        :updateIfDiceIsRolling="updateIfDiceIsRolling"/>
    </div>
    <div class="game-footer">
      <div class="roll-button-container">
        <button
          class="roll-button"
          @click="handleRollClick">
          Roll
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Player from '@/components/Player.vue';

export default {
  name: 'home',
  components: {
    Player,
  },
  data: () => ({
    currentRoll: [],
    diceIsRolling: false,
    numPlayers: 3,
    scores: [],
    startingScore: 3,
    turnIndex: -1, // the index of the player whose turn it is
  }),
  created() {
    this.startNewGame();
  },
  computed: {
    indexToLeft() {
      if (this.turnIndex === 0) return this.numPlayers - 1;
      return this.turnIndex - 1;
    },
    indexToRight() {
      if (this.turnIndex === this.numPlayers - 1) return 0;
      return this.turnIndex + 1;
    },
  },
  methods: {
    didSomeoneWin() {
      return (this.scores.filter(score => score > 0).length <= 1);
    },
    diceToDisplay(playerIndex) {
      if (playerIndex === this.turnIndex) {
        return this.currentRoll;
      }
      return [];
    },
    goToNextTurn() {
      if (this.didSomeoneWin()) {
        return;
      }
      do {
        this.turnIndex = (this.turnIndex === this.numPlayers - 1) ? 0 : this.turnIndex + 1;
      } while (this.scores[this.turnIndex] === 0);
    },
    handleRollClick() {
      if (!this.diceIsRolling) {
        this.goToNextTurn();
        this.currentRoll = [];
        let numDiceToRoll = this.scores[this.turnIndex];
        if (numDiceToRoll > 3) numDiceToRoll = 3;
        for (let i = 0; i < numDiceToRoll; i += 1) {
          this.currentRoll.push(this.rollDice());
        }
        this.updateScores();
      }
    },
    rollDice() {
      const value = 6 * Math.random();
      if (value < 1) return 'L';
      if (value < 2) return 'C';
      if (value < 3) return 'R';
      return 'O';
    },
    startNewGame() {
      this.currentRoll = [];
      this.turnIndex = -1;

      // Initialize score for each player
      this.scores = [];
      for (let i = 0; i < this.numPlayers; i += 1) {
        this.scores.push(this.startingScore);
      }
    },
    updateIfDiceIsRolling(value) {
      this.diceIsRolling = value;
    },
    updateScores() {
      this.currentRoll.forEach((roll) => {
        if (roll === 'L') {
          this.scores[this.indexToLeft] += 1;
          this.scores[this.turnIndex] -= 1;
        } else if (roll === 'C') {
          this.scores[this.turnIndex] -= 1;
        } else if (roll === 'R') {
          this.scores[this.indexToRight] += 1;
          this.scores[this.turnIndex] -= 1;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  height: 100vh;
  text-align: center;
}

.game-header {
  background-color: #bbb;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  padding: 20px;
  h1 {
    font-size: 40px;
    font-weight: 400;
    letter-spacing: 1.5px;
  }
}

.nav {
  position: absolute;
  right: 10px;
  top: 20px;
  button {
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
    color: #2c3e50;
    cursor: pointer;
    margin: 0 10px;
    outline: 0;
    padding: 8px 24px;
    text-decoration: none;
    &:hover {
      background-color: #ddd;
    }
  }
}

.playarea {
  display: flex;
}

.game-footer {
  background-image: linear-gradient(0deg, #999, #bbb);
  border-top: 1px solid rgba(0, 0, 0, 0.4);
  flex: 1;
  padding: 30px;
}

.roll-button {
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.2);
  color: #333;
  cursor: pointer;
  font-size: 20px;
  outline: 0;
  padding: 20px 50px;
}
</style>
