<template>
  <div class="dicearea">
    {{ diceDisplay.join(' ') }}
  </div>
</template>

<script>
export default {
  name: 'DiceArea',
  props: {
    diceDisplay: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.dicearea {
  border: 1px solid #aaa;
  font-size: 18px;
  height: 40px;
  line-height: 40px;
  margin: 0 15px;
}
</style>
