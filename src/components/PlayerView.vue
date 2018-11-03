<template>
  <div class="player-view">
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
    colorClasses: ['red', 'blue', 'green'],
    names: ['Casey', 'Jefferson', 'Todd', 'Chase', 'Miriam', 'Danka', 'Joe', 'Happy'],
  }),
  methods: {
    diceToDisplay(playerIndex) {
      if (playerIndex === this.turnIndex) {
        return this.currentRoll;
      }
      return [];
    },
  },
};
</script>

<style scoped>
.player-view {
  display: flex;
}
</style>
