<template>
  <div
    class="dicearea"
    @click="handleClick"
  >
    <div class="dice-display">
      {{ diceShown }}
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
    dice: {
      type: Array,
      required: true,
    },
    isNext: {
      type: Boolean,
      default: false,
    },
    updateIfDiceIsRolling: {
      type: Function,
      required: true,
    },
  },
  data: () => ({
    animationInterval: null,
    diceShown: '',
  }),
  created() {
    this.settleDice();
  },
  watch: {
    dice(val) {
      if (val.length) {
        this.updateIfDiceIsRolling(true);
        this.animateDice(val.length);

        setTimeout(() => {
          this.settleDice();
          this.updateIfDiceIsRolling(false);
        }, animationDuration);
      } else {
        this.settleDice();
      }
    },
  },
  methods: {
    animateDice(numDie) {
      this.animationInterval = setInterval(() => {
        const diceSides = ['C', 'L', 'R', 'O'];
        const diceShown = [];
        for (let i = 0; i < numDie; i += 1) {
          diceShown.push(diceSides[Math.floor(diceSides.length * Math.random())]);
        }
        this.diceShown = diceShown.join(' ');
      }, animationStepTime);
    },
    handleClick() {
      this.$emit('click');
    },
    settleDice() {
      clearInterval(this.animationInterval);
      this.diceShown = this.dice.join(' ');
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
  padding: 10px 30px 5px;
  position: relative;
  width: 150px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }
}

.dice-display {
  font-size: 24px;
  height: 60px;
  text-align: center;
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
