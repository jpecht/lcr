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
export default {
  name: 'Scoreboard',
  props: {
    diceIsRolling: {
      type: Boolean,
      required: true,
    },
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
  created() {
    this.scoreDisplay = this.score;
  },
  watch: {
    diceIsRolling(newVal, oldVal) {
      if (oldVal === true && newVal === false) {
        this.updateScores();
      }
    },
  },
  methods: {
    updateScores() {
      clearInterval(this.scoreChangeInterval);

      // Record the change in score
      const score = this.score;
      this.scoreDifference = score - this.scoreDisplay;

      if (this.scoreDifference) {
        // Update the score the user is seeing
        const scoreChangeDelay = 400;
        const scoreChangeDuration = 400;
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
  font-size: 42px;
  height: 140px;
  margin-top: 20px;
  text-align: center;
}

.score-display-container {
  display: inline-block;
  position: relative;
}

.score-difference-positive { color: #033617; }
.score-difference-negative { color: #4a0406; }

.lowerfade-leave-active {
  transition: all 4s ease;
}

.lowerfade-enter,
.lowerfade-leave-to {
  opacity: 0;
  transform: translate(0, 60px);
}
</style>
