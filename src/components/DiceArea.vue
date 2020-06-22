<template>
  <div
    class="dicearea"
    @click="handleClick"
  >
    <div class="dice-display">
      <div
        v-for="(d, index) in diceShown"
        :key="index"
        :class="['dice', {
          'dice-pending': d === 'P',
        }]"
      >
        <template v-if="d && d !== 'P'">{{ d }}</template>
        <template v-else>&nbsp;</template>
        <div
          v-show="d && d !== 'O' && d !== 'P' && !diceIsRolling"
          class="dice-bad-overlay"
        />
      </div>
    </div>
    <div class="roll-text">
      <transition name="fadein">
        <span v-show="isUp && !currentRoll.length">
          ROLL
        </span>
      </transition>
      <span v-show="isUp && currentRoll.length && !diceIsRolling">
        ACCEPT
      </span>
    </div>
  </div>
</template>

<script>
const animationStepTime = 50;
const animationDuration = 1000;

import { mapActions, mapState } from 'vuex';

export default {
  name: 'DiceArea',
  props: {
    isUp: {
      type: Boolean,
      default: false,
    },
    pendingScore: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState([
      'currentRoll',
      'diceIsRolling',
    ]),

    diceShown() {
      const dice = new Array(this.score).fill('');
      if (this.isUp && this.currentRoll.length) {
        return [...this.currentRoll, ...dice.slice(3)];
      }
      if (this.pendingScore > this.score) {
        return new Array(this.pendingScore).fill('').fill('P', this.score);
      }
      return dice;
    },
  },
  methods: {
    ...mapActions([
      'acceptDiceRoll',
      'rollDice',
    ]),

    handleClick() {
      // Roll the dice
      if (this.isUp && !this.currentRoll.length) {
        this.rollDice(Math.min(this.score, 3));
        return;
      }

      // Accept the dice roll
      if (this.isUp && this.currentRoll.length && !this.diceIsRolling) {
        this.acceptDiceRoll();
        return;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.dicearea {
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.6);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  display: inline-block;
  font-weight: 300;
  margin-top: 15px;
  padding: 10px 20px 5px;
  position: relative;
  width: 180px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }
}

.dice-display {
  height: 60px;
}

.extra-dice-container {
  display: inline-block;
  margin-left: 20px;
}

.dice {
  border: 1px solid #333;
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  margin-right: 2px;
  overflow: hidden;
  padding: 2px 5px;
  position: relative;
  text-align: center;
  width: 14px;
}

.dice:nth-child(4) { margin-left: 10px; }

.dice-pending { background-color: forestgreen; }

.dice-bad-overlay {
  border: 2px solid red;
  box-sizing: border-box;
  height: 30px;
  left: -3px;
  position: absolute;
  top: -2px;
  width: 30px;
  transform: rotate(45deg);
}

.roll-text {
  font-size: 12px;
  font-weight: 600;
  height: 16px;
  text-align: center;
}

.fadein-enter-active {
  transition: all 1s ease;
}

.fadein-enter {
  opacity: 0;
}
</style>
