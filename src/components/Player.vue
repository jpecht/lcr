<template>
  <div class="player">
    <DiceArea :diceDisplay="diceDisplay"/>
    <div class="nameplate">
      Jefferson
    </div>
    <div class="score">
      {{ score }}
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
    diceDisplay: {
      type: String,
      default: '',
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
  border: 1px solid #ccc;
  flex: 1;
  margin: 10px 25px;
  padding: 25px 50px;
}

.nameplate {
  margin: 10px;
}

.score {
  font-size: 36px;
  margin: 10px;
}
</style>
