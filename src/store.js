import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentRoll: [],
    diceIsRolling: false,
    numPlayers: 3,
    probabilities: [],
    scores: [],
    turnIndex: 0,
  },
  mutations: {
    incrementTurn(state) {
      do {
        state.turnIndex = (state.turnIndex === state.numPlayers - 1) ? 0 : state.turnIndex + 1;
      } while (state.scores[state.turnIndex] === 0);
    },
    initializeState(state) {
      state.currentRoll = [];
      state.diceIsRolling = false;
      state.probabilities = new Array(state.numPlayers).fill([]);
      state.scores = new Array(state.numPlayers).fill(3);
      state.turnIndex = 0;
    },
    setCurrentRoll(state, currentRoll) {
      state.currentRoll = [...currentRoll];
    },
    setDiceRolling(state, isDiceRolling) {
      state.diceIsRolling = isDiceRolling;
    },
    setScores(state, scores) {
      state.scores = [...scores];
    },
  },
  actions: {
    acceptDiceRoll({ commit, dispatch, state }) {
      const newScores = [...state.scores];
      const indexToLeft = dispatch('getIndexToLeft');
      const indexToRight = dispatch('getIndexToRight');
      state.currentRoll.forEach((roll) => {
        if (roll === 'L') {
          newScores[indexToLeft] += 1;
          newScores[state.turnIndex] -= 1;
        } else if (roll === 'C') {
          newScores[state.turnIndex] -= 1;
        } else if (roll === 'R') {
          newScores[indexToRight] += 1;
          newScores[state.turnIndex] -= 1;
        }
      });      
      commit('setScores', newScores);
      commit('setCurrentRoll', []);
      commit('incrementTurn');
    },
    getIndexToLeft({ state }) {
      return (state.turnIndex === 0) ? state.numPlayers - 1 : state.turnIndex - 1;
    },
    getIndexToRight({ state }) {
      return (state.turnIndex === state.numPlayers - 1) ? 0 : state.turnIndex + 1;
    },
    rollDice({ commit }, numDice) {
      commit('setDiceRolling', true);
      const animationInterval = setInterval(() => {
        const currentRoll = [];
        const diceSides = ['C', 'L', 'R', 'O', 'O', 'O'];
        for (let i = 0; i < numDice; i += 1) {
          currentRoll.push(diceSides[Math.floor(diceSides.length * Math.random())]);
        }
        commit('setCurrentRoll', currentRoll);
      }, 50);

      // Roll the dice for 1s then settle dice
      setTimeout(() => {
        clearInterval(animationInterval);
        commit('setDiceRolling', false);
      }, 1000);
    },
    startNewGame({ commit }) {
      commit('initializeState');
    },
  }
})
