<template>
  <div class="dicearea">
    {{ diceShown }}
  </div>
</template>

<script>
const animationStepTime = 50;
const animationDuration = 1500;

export default {
  name: 'DiceArea',
  props: {
    dice: {
      type: Array,
      required: true,
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
    settleDice() {
      clearInterval(this.animationInterval);
      this.diceShown = this.dice.join(' ');
    },
  },
};
</script>

<style scoped>
.dicearea {
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.6);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  font-size: 40px;
  font-weight: 300;
  height: 100px;
  line-height: 100px;
  margin: 0 15px;
}
</style>
