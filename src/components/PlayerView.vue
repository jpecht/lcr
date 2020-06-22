<template>
  <div class="player-view">
    <Player
      v-for="(score, index) in scores"
      :key="index"
      :colorClass="colorClasses[index]"
      :isUp="index === turnIndex"
      :name="names[index]"
      :playerIndex="index"
      :probabilities="probabilities[index]"
      :score="score"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Player from '@/components/Player.vue';

export default {
  name: 'PlayerView',
  components: {
    Player,
  },
  data: () => ({
    colorClasses: ['red', 'blue', 'green', 'purple', 'lightblue'],
    names: ['Casey', 'Jefferson', 'Todd', 'Chase', 'Miriam', 'Danka', 'Joe', 'Happy'],
  }),
  computed: {
    ...mapState([
      'probabilities',
      'scores',
      'turnIndex',
    ]),
  },
  methods: {
    diceToDisplay(playerIndex) {
      if (playerIndex === this.turnIndex) {
        return this.currentRoll;
      }
      return [];
    },
  },
};
</script>

<style scoped>
</style>
