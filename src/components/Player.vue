<template>
  <div class="player">
    <DiceArea
      :dice="dice"
      :updateIfDiceIsRolling="updateIfDiceIsRolling"/>
    <div class="nameplate">
      Jefferson
    </div>
    <div class="probability">
      <span class="probability-perc">
        {{ Math.round(100 * probability) }}%
      </span>
      chance of winning
    </div>
    <Scoreboard
      :diceIsRolling="diceIsRolling"
      :score="score"/>
    <ProbabilityChart :chartData="probabilityHistory"/>
  </div>
</template>

<script>
import DiceArea from '@/components/DiceArea.vue';
import ProbabilityChart from '@/components/ProbabilityChart.vue';
import Scoreboard from '@/components/Scoreboard.vue';

export default {
  name: 'Player',
  components: {
    DiceArea,
    ProbabilityChart,
    Scoreboard,
  },
  props: {
    dice: {
      type: Array,
      default: [],
    },
    diceIsRolling: {
      type: Boolean,
      required: true,
    },
    probability: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    updateIfDiceIsRolling: {
      type: Function,
      required: true,
    },
  },
  data: () => ({
    animatingDice: false,
    probabilityHistory: [],
    scoreChangeInterval: null,
    scoreDifference: 0,
    scoreDisplay: 0,
    triggerDifferenceAnimation: false,
  }),
  created() {
    this.probabilityHistory.push(this.probability);
  },
  watch: {
    probability(newVal) {
      this.probabilityHistory.push(newVal);
    },
  },
};
</script>

<style scoped>
.player {
  color: rgba(0, 0, 0, 0.9);
  flex: 1;
  min-height: 300px;
  padding: 40px 50px;
}

.player:first-child { background-color: #96858f; }
.player:nth-child(2) { background-color: #6d7993; }
.player:nth-child(3) { background-color: #9099a2; }

.nameplate {
  font-size: 16px;
  margin: 30px 10px 10px;
}

.probability-perc {
  font-weight: 600;
}
</style>
