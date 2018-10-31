export default class {
  calculateProbabilities(scores) {
    const numGames = 1000;

    // Keep track of games won
    const gamesWon = [];
    for (let i = 0; i < numGames; i += 1) {
      gamesWon.push(0);
    }

    // Simulate all games
    for (let i = 0; i < numGames; i += 1) {
      const indexWon = this.simulateGame(scores);
      gamesWon[indexWon] += 1;
    }

    // Return winning probabilities
    const winningProbabilities = [];
    gamesWon.forEach((gw) => {
      winningProbabilities.push(gw / numGames);
    });
    return winningProbabilities;
  }
  
  findIndexToLeft(index, len) {
    return (index === 0) ? len - 1 : index - 1;
  }
  
  findIndexToRight(index, len) {
    return (index === len - 1) ? 0 : index + 1;
  }
  
  gameIsOver(scores) {
    return (scores.filter(s => s > 0).length <= 1);
  }
  
  simulateGame(scoreArray) {
    const scores = scoreArray.slice(0);
    const numPlayers = scores.length;
    let turn = 0;

    while (!this.gameIsOver(scores)) {
      let leftIndex = this.findIndexToLeft(turn, numPlayers);
      let rightIndex = this.findIndexToRight(turn, numPlayers);
      let score = scores[turn];
      let numDice = (score < 3) ? score : 3;

      // Roll dice and update scores
      for (let i = 0; i < numDice; i += 1) {
        const randNum = 6 * Math.random();
        if (randNum < 1) {
          scores[leftIndex] += 1;
          scores[turn] -= 1;
        } else if (randNum < 2) {
          scores[turn] -= 1;
        } else if (randNum < 3) {
          scores[rightIndex] += 1;
          scores[turn] -= 1;
        }
      }
      turn = this.findIndexToRight(turn, numPlayers);
    }
    return scores.findIndex(s => s > 0);
  }
};
