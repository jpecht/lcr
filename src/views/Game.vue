<template>
  <div class="home">
    <div class="game-header">
      <div class="nav">
        <button @click="startNewGame">New Game</button>
        <button @click="toggleSettingsMenu">Settings</button>
        <SettingsMenu
          v-model="settingsOpen"
          :numPlayers="numPlayers"
          :updateNumPlayers="updateNumPlayers"/>
      </div>
      <h1>LCR</h1>
    </div>
    <div class="playarea">
      <Player
        v-for="(score, index) in scores"
        :key="index"
        :colorClass="colorClasses[index]"
        :dice="diceToDisplay(index)"
        :diceIsRolling="diceIsRolling"
        :name="names[index]"
        :probabilities="probabilities[index]"
        :score="score"
        :updateIfDiceIsRolling="updateIfDiceIsRolling"/>
    </div>
    <div class="game-footer">
      <div class="roll-button-container">
        <button
          :class="{
            'roll-button': true,
            'roll-button-rolling': diceIsRolling,
          }"
          @click="handleRollClick">
          {{ diceIsRolling ? 'Rolling...' : 'Roll' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Player from '@/components/Player.vue';
import SettingsMenu from '@/components/SettingsMenu.vue';
import Simulator from '@/Simulator';

export default {
  name: 'home',
  components: {
    Player,
    SettingsMenu,
  },
  data: () => ({
    colorClasses: ['red', 'blue', 'green'],
    currentRoll: [],
    diceIsRolling: false,
    names: ['Casey', 'Jefferson', 'Todd', 'Chase', 'Miriam', 'Danka', 'Joe', 'Happy'],
    numPlayers: 3,
    probabilities: [],
    scores: [],
    settingsOpen: false,
    startingScore: 3,
    turnIndex: -1, // the index of the player whose turn it is
  }),
  created() {
    this.startNewGame();
  },
  computed: {
    indexToLeft() {
      return (this.turnIndex === 0) ? this.numPlayers - 1 : this.turnIndex - 1;
    },
    indexToRight() {
      return (this.turnIndex === this.numPlayers - 1) ? 0 : this.turnIndex + 1;
    },
  },
  watch: {
    numPlayers() {
      this.startNewGame();
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
    recordProbabilities() {
      const newProbabilities = Simulator.calculateProbabilities(this.scores);
      newProbabilities.forEach((prob, index) => {
        this.probabilities[index].push(prob);
      });
    },
    rollDice() {
      const value = 6 * Math.random();
      if (value < 1) return 'L';
      if (value < 2) return 'C';
      if (value < 3) return 'R';
      return 'O';
    },
    startNewGame() {
      // Empty out dice, clear turn
      this.currentRoll = [];
      this.turnIndex = -1;

      // Initialize scores and probabilities for each player
      this.probabilities = [];
      this.scores = [];
      for (let i = 0; i < this.numPlayers; i += 1) {
        this.probabilities.push([]);
        this.scores.push(this.startingScore);
      }
      this.recordProbabilities();
    },
    toggleSettingsMenu() { this.settingsOpen = !this.settingsOpen; },
    updateIfDiceIsRolling(value) {
      this.diceIsRolling = value;
      if (this.diceIsRolling === false) {
        this.recordProbabilities();
      }
    },
    updateNumPlayers(numPlayers) { this.numPlayers = numPlayers; },
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
  min-height: 100vh;
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
  text-align: right;
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
  &.roll-button-rolling {
    color: #777;
    cursor: not-allowed;
  }
}
</style>
