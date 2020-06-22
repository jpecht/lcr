<template>
  <div class="home">
    <div class="game-header">
      <div class="nav">
        <button @click="startNewGame">New Game</button>
        <button @click="toggleInstructions">How to Play</button>
        <button @click="toggleSettingsMenu">Settings</button>
        <SettingsMenu
          v-model="settingsOpen"
          :numPlayers="numPlayers"
          :updateNumPlayers="updateNumPlayers"
        />
        <div v-show="instructionsVisible" class="instructions">
          Roll the dice to determine where to pass it.
          <ul>
            <li>An L means you pass that die to the person to your left</li>
            <li>An R means you pass that die to the person to your right</li>
            <li>A C means you discard that die in the center</li>
            <li>An O means you get to keep the die!</li>
          </ul>
        </div>
      </div>
      <h1>LCR</h1>
      <h2>A dice game of probability</h2>
    </div>
    <PlayerView />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import PlayerView from '@/components/PlayerView.vue';
import SettingsMenu from '@/components/SettingsMenu.vue';

export default {
  name: 'home',
  components: {
    PlayerView,
    SettingsMenu,
  },
  data: () => ({
    instructionsVisible: false,
    settingsOpen: false,
  }),
  created() {
    this.startNewGame();
  },
  computed: {
    ...mapState([
      'numPlayers',
    ]),
  },
  methods: {
    ...mapActions([
      'setNumPlayers',
      'startNewGame',
    ]),

    didSomeoneWin() {
      return this.scores.filter(score => score > 0).length <= 1;
    },
    toggleInstructions() { this.instructionsVisible = !this.instructionsVisible; },
    toggleSettingsMenu() { this.settingsOpen = !this.settingsOpen; },
    updateNumPlayers(numPlayers) { this.setNumPlayers(numPlayers); },
  },
};
</script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-align: center;
}

.game-header {
  background-color: #bbb;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  padding: 18px 50px;
  text-align: left;
  h1 {
    display: inline-block;
    font-size: 40px;
    font-weight: 400;
    letter-spacing: 1.5px;
  }
  h2 {
    display: inline-block;
    font-size: 16px;
    margin-left: 30px;
    position: relative;
    top: -1px;
  }
}

.nav {
  position: absolute;
  right: 10px;
  text-align: right;
  top: 20px;
  button {
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid #555;
    color: #2c3e50;
    cursor: pointer;
    margin: 0 10px;
    outline: 0;
    padding: 8px 24px;
    text-decoration: none;
    &:hover {
      background-color: #ddd;
    }
  }
}

.instructions {
  display: inline-block;
  font-size: 11px;
  margin-top: 10px;
  max-width: 500px;
  position: absolute;
  left: 10px;
  text-align: left;
  top: 30px;

  ul { margin: 2px 0 0; padding: 0; }
  li {
    margin-left: 30px;
  }
}
</style>
