<template>
  <div :class="['player', colorClass]">
    <DiceArea
      :dice="dice"
      :updateIfDiceIsRolling="updateIfDiceIsRolling"/>
    <div class="nameplate">
      {{ name }}
    </div>
    <Scoreboard
      :diceIsRolling="diceIsRolling"
      :score="score"/>
    <ProbabilityChart :chartData="probabilities"/>
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
    colorClass: {
      type: String,
      default: '',
    },
    dice: {
      type: Array,
      default: () => [],
    },
    diceIsRolling: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    probabilities: {
      type: Array,
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
    scoreChangeInterval: null,
    scoreDifference: 0,
    scoreDisplay: 0,
    triggerDifferenceAnimation: false,
  }),
};
</script>

<style scoped>
.player {
  color: rgba(0, 0, 0, 0.9);
  flex: 1;
  min-height: 300px;
  padding: 20px;
}

.nameplate {
  font-size: 16px;
  margin: 30px 10px 10px;
}
</style>
