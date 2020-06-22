<template>
  <div :class="['player', colorClass]">
    <div class="main-area">
      <div>
        <div class="nameplate">
          {{ name }}
        </div>
        <Scoreboard
          :diceIsRolling="diceIsRolling"
          :score="score"/>
      </div>
      <DiceArea
        :dice="dice"
        :isNext="isNext"
        :updateIfDiceIsRolling="updateIfDiceIsRolling"
        @click="handleDiceAreaClick"
      />
    </div>
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
    handleRollClick: {
      type: Function,
      required: true,
    },
    isNext: {
      type: Boolean,
      default: false,
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
  methods: {
    handleDiceAreaClick() {
      if (this.isNext) {
        this.handleRollClick();
      }
    },
  },
};
</script>

<style scoped>
.player {
  color: rgba(0, 0, 0, 0.9);
  display: flex;
  font-size: 20px;
  padding: 20px 50px;
  text-align: left;
}

.main-area { margin-right: 80px; }

.nameplate {
  display: inline-block;
  font-weight: 600;
  width: 200px;
}
</style>
