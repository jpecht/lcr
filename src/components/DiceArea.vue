<template>
  <div
    class="dicearea"
    @click="handleClick"
  >
    <div class="dice-display">
      <div
        v-for="d in diceShown"
        :key="index"
        class="dice"
      >
        {{ d }}
      </div>
      <div class="extra-dice-container">
        <div
          v-for="d in extraDice"
          :key="index"
          class="dice"
        >
          &nbsp;
        </div>
      </div>
    </div>
    <div class="roll-text">
      <transition name="fadein">
        <span v-show="isNext">
          ROLL
        </span>
      </transition>
      <span v-show="!isNext">&nbsp;</span>
    </div>
  </div>
</template>

<script>
const animationStepTime = 50;
const animationDuration = 1000;

export default {
  name: 'DiceArea',
  props: {
    diceRolled: {
      type: Array,
      required: true,
    },
    isNext: {
      type: Boolean,
      default: false,
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
  created() {
    this.settleDice();
  },
  data: () => ({
    animationInterval: null,
    diceShown: [],
  }),
  computed: {
    extraDice() {
      if (this.score <= 3) return [];
      const dice = [];
      for (let i = 0; i < this.score - 3; i++) {
        dice.push(0);
      }
      return dice;
    },
  },
  watch: {
    diceRolled(val) {
      if (val.length) {
        this.updateIfDiceIsRolling(true);
        this.animateDice(val.length);

        setTimeout(() => {
          this.settleDice();
          this.updateIfDiceIsRolling(false);
        }, animationDuration);
      } else {
        this.showBaseDice();
      }
    },
  },
  methods: {
    animateDice(numDie) {
      this.animationInterval = setInterval(() => {
        const diceSides = ['C', 'L', 'R', 'O'];
        this.diceShown = [];
        for (let i = 0; i < numDie; i += 1) {
          this.diceShown.push(diceSides[Math.floor(diceSides.length * Math.random())]);
        }
      }, animationStepTime);
    },
    handleClick() {
      this.$emit('click');
    },
    settleDice() {
      clearInterval(this.animationInterval);
      this.diceShown = this.diceRolled.slice(0);
    },
    showBaseDice() {
      this.diceShown = [];
      for (let i = 0; i < Math.min(this.score, 3); i += 1) {
        this.diceShown.push('');
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
  padding: 2px 5px;
  text-align: center;
  width: 14px;
}

.roll-text {
  font-size: 12px;
  font-weight: 600;
  text-align: center;
}

.fadein-enter-active {
  transition: all 2s ease;
  transition-delay: 1.5s;
}

.fadein-enter {
  opacity: 0;
}
</style>
