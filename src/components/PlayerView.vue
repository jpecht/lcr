<template>
  <div class="player-view">
    <Player
      v-for="(score, index) in scores"
      :key="index"
      :colorClass="colorClasses[index]"
      :isUp="index === turnIndex"
      :isWinner="index === winnerIndex"
      :name="names[index]"
      :pendingScore="pendingScores[index]"
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
      'pendingScores',
      'probabilities',
      'scores',
      'turnIndex',
      'winnerIndex',
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
.player-view {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
}
</style>
