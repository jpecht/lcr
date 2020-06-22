<template>
  <div class="score">
    <div class="score-display-container">
      <div class="score-display">
        {{ scoreDisplay }}
      </div>
      <transition name="lowerfade">
        <div
          v-if="triggerDifferenceAnimation"
          :class="{
            'score-difference': true,
            'score-difference-negative': scoreDifference < 0,
            'score-difference-positive': scoreDifference > 0,
          }">
          {{ scoreDifference > 0 ? `+${scoreDifference}` : scoreDifference }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
const scoreChangeDelay = 0;
const scoreChangeDuration = 0;

import { mapState } from 'vuex';

export default {
  name: 'Scoreboard',
  props: {
    score: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    scoreChangeInterval: null,
    scoreDifference: 0,
    scoreDisplay: 0,
    triggerDifferenceAnimation: false,
  }),
  computed: {
    ...mapState(['diceIsRolling']),
  },
  created() {
    this.scoreDisplay = this.score;
  },
  watch: {
    score() { this.updateScores(); },
  },
  methods: {
    updateScores() {
      clearInterval(this.scoreChangeInterval);

      // Record the change in score
      const { score } = this;
      this.scoreDifference = score - this.scoreDisplay;

      if (this.scoreDifference) {
        // Update the score the user is seeing
        setTimeout(() => {
          this.scoreChangeInterval = setInterval(() => {
            this.scoreDisplay += (this.scoreDifference > 0) ? 1 : -1;
            if (this.scoreDisplay === score) {
              clearInterval(this.scoreChangeInterval);
            }
          }, scoreChangeDuration / Math.abs(this.scoreDifference));
        }, scoreChangeDelay);

        // Animate the change in score
        this.triggerDifferenceAnimation = true;
        setTimeout(() => {
          this.triggerDifferenceAnimation = false;
        }, 40);
      }
    },
  },
};
</script>

<style scoped>
.score {
  display: inline-block;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
}

.score-display-container {
  display: inline-block;
  position: relative;
}

.score-difference {
  left: -10px;
  position: absolute;
  top: 20px;
}
.score-difference-positive { color: #033617; }
.score-difference-negative { color: #4a0406; }

.lowerfade-leave-active {
  transition: all 4s ease;
}

.lowerfade-enter,
.lowerfade-leave-to {
  opacity: 0;
  transform: translate(0, 20px);
}
</style>
