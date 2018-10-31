<template>
  <div class="player">
    <DiceArea
      :dice="dice"
      :updateIfDiceIsRolling="updateIfDiceIsRolling"/>
    <div class="nameplate">
      Jefferson
    </div>
    <div class="probability">
      {{ Math.round(100 * probability) }}% chance of winning
    </div>
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
  </div>
</template>

<script>
import DiceArea from '@/components/DiceArea.vue';

export default {
  name: 'Player',
  components: {
    DiceArea,
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
      // Record the change in score
      this.scoreDifference = this.score - this.scoreDisplay;

      if (this.scoreDifference) {
        // Update the score the user is seeing
        const scoreChangeDelay = 400;
        const scoreChangeDuration = 500;
        setTimeout(() => {
          const interval = setInterval(() => {
            this.scoreDisplay += (this.scoreDifference > 0) ? 1 : -1;
            if (this.scoreDisplay === this.score) {
              clearInterval(interval);
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
  }
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

.score {
  font-size: 42px;
  height: 60px;
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
