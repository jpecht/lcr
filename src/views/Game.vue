<template>
  <div class="home">
  	<h1>LCR</h1>
    <div class="playarea">
      <Player
        v-for="(score, index) in scores"
        :key="index"
        :diceDisplay="diceToDisplay(index)"
        :score="score"/>
    </div>
    <div class="roll-button-container">
      <button
        class="roll-button"
        @click="handleRollClick">
        Roll
      </button>
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
    numPlayers: 3,
    scores: [],
    startingScore: 3,
    turnIndex: -1, // the index of the player whose turn it is
  }),
  created() {
    // Initialize score for each player
    for (let i = 0; i < this.numPlayers; i += 1) {
      this.scores.push(this.startingScore);
    }
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
      this.goToNextTurn();
      this.currentRoll = [];
      let numDiceToRoll = this.scores[this.turnIndex];
      if (numDiceToRoll > 3) numDiceToRoll = 3;
      for (let i = 0; i < numDiceToRoll; i += 1) {
        this.currentRoll.push(this.rollDice());
      }
      this.updateScores();
    },
    rollDice() {
      const value = 6 * Math.random();
      if (value < 1) return 'L';
      if (value < 2) return 'C';
      if (value < 3) return 'R';
      return 'O';
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

<style scoped>
.home {
  text-align: center;
}

.playarea {
  display: flex;
}

.roll-button {
  background-color: steelblue;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  font-size: 20px;
  margin: 20px;
  outline: 0;
  padding: 20px 50px;
}
</style>
