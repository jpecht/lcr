import Simulator from '@/Simulator';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentRoll: [],
    diceIsRolling: false,
    numPlayers: 3,
    pendingScores: [],
    probabilities: [],
    scores: [],
    turnIndex: 0,
  },
  mutations: {
    addProbabilities(state, newProbabilities) {
      newProbabilities.forEach((prob, index) => {
        state.probabilities[index].push(prob);
      });
    },
    clearPendingScores(state) {
      state.pendingScores = [...state.scores];
    },
    incrementTurn(state) {
      do {
        state.turnIndex = (state.turnIndex === state.numPlayers - 1) ? 0 : state.turnIndex + 1;
      } while (state.scores[state.turnIndex] === 0);
    },
    initializeState(state) {
      state.currentRoll = [];
      state.diceIsRolling = false;
      state.pendingScores = new Array(state.numPlayers).fill(3);
      state.probabilities = [];
      for (let i = 0; i < state.numPlayers; i += 1) {
        state.probabilities.push([]);
      }
      state.scores = new Array(state.numPlayers).fill(3);
      state.turnIndex = 0;
    },
    setCurrentRoll(state, currentRoll) {
      state.currentRoll = [...currentRoll];
    },
    setDiceRolling(state, isDiceRolling) {
      state.diceIsRolling = isDiceRolling;
    },
    setNumPlayers(state, numPlayers) {
      state.numPlayers = numPlayers;
    },
    setPendingScores(state, scores) {
      state.pendingScores = [...scores];
    },
    setScores(state, scores) {
      state.scores = [...scores];
    },
  },
  actions: {
    async acceptDiceRoll({ commit, dispatch, state }) {
      commit('setScores', state.pendingScores);
      commit('clearPendingScores');
      commit('setCurrentRoll', []);
      dispatch('setProbabilities');
      commit('incrementTurn');
    },
    getIndexToLeft({ state }) {
      return (state.turnIndex === 0) ? state.numPlayers - 1 : state.turnIndex - 1;
    },
    getIndexToRight({ state }) {
      return (state.turnIndex === state.numPlayers - 1) ? 0 : state.turnIndex + 1;
    },
    rollDice({ commit, dispatch }, numDice) {
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
        dispatch('setPendingScores');
      }, 1000);
    },
    async setPendingScores({ commit, dispatch, state }) {
      const newScores = [...state.scores];
      const indexToLeft = await dispatch('getIndexToLeft');
      const indexToRight = await dispatch('getIndexToRight');
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
      commit('setPendingScores', newScores);
    },
    setNumPlayers({ commit, dispatch }, numPlayers) {
      commit('setNumPlayers', numPlayers);
      dispatch('startNewGame');
    },
    setProbabilities({ commit, state }) {
      const newProbabilities = Simulator.calculateProbabilities(state.scores);
      commit('addProbabilities', newProbabilities);
    },
    startNewGame({ commit, dispatch }) {
      commit('initializeState');
      dispatch('setProbabilities');
    },
  }
});
