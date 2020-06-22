<template>
  <div :class="['player', colorClass]">
    <div class="main-area">
      <div>
        <div class="nameplate">
          {{ name }}
        </div>
        <Scoreboard :score="score"/>
      </div>
      <DiceArea
        :isUp="isUp"
        :pendingScore="pendingScore"
        :score="score"
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
    isUp: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    pendingScore: {
      type: Number,
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
