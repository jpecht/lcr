<template>
  <div class="player-view">
    <Player
      v-for="(score, index) in scores"
      :key="index"
      :colorClass="colorClasses[index]"
      :dice="diceToDisplay(index)"
      :diceIsRolling="diceIsRolling"
      :handleRollClick="handleRollClick"
      :isNext="isNext(index)"
      :name="names[index]"
      :probabilities="probabilities[index]"
      :score="score"
      :updateIfDiceIsRolling="updateIfDiceIsRolling"/>
  </div>
</template>

<script>
import Player from '@/components/Player.vue';

export default {
  name: 'PlayerView',
  components: {
    Player,
  },
  props: {
    currentRoll: {
      type: Array,
      required: true,
    },
    diceIsRolling: {
      type: Boolean,
      required: true,
    },
    handleRollClick: {
      type: Function,
      required: true,
    },
    probabilities: {
      type: Array,
      required: true,
    },
    scores: {
      type: Array,
      required: true,
    },
    turnIndex: {
      type: Number,
      required: true,
    },
    updateIfDiceIsRolling: {
      type: Function,
      required: true,
    },
  },
  data: () => ({
    colorClasses: ['red', 'blue', 'green', 'purple', 'lightblue'],
    names: ['Casey', 'Jefferson', 'Todd', 'Chase', 'Miriam', 'Danka', 'Joe', 'Happy'],
  }),
  methods: {
    diceToDisplay(playerIndex) {
      if (playerIndex === this.turnIndex) {
        return this.currentRoll;
      }
      return [];
    },
    isNext(playerIndex) {
      const numPlayers = this.scores.length;
      if (playerIndex === 0 && this.turnIndex === numPlayers - 1) return true;
      return playerIndex === this.turnIndex + 1;
    },
  },
};
</script>

<style scoped>
</style>
