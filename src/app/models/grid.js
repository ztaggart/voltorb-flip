export const GRID_WIDTH = 5;
export const GRID_HEIGHT = 5;
export default class Grid {
  constructor(winCallback, grid, won, lost, currentCoins) {
    this.winCallback = winCallback;
    this.grid = grid;
    this.won = won || false;
    this.lost = lost || false;
    this.currentCoins = currentCoins || 0;
  }

  initialize() {
    let board = [];
    for (let colIndex = 0; colIndex < GRID_WIDTH; colIndex++) {
      let cellCol = [];
      for (let rowIndex = 0; rowIndex < GRID_HEIGHT; rowIndex++) {
        cellCol.push({
          column: 0,
          row: 0,
          memo: false,
          flipped: false,
          value: this.generateRandomValue(),
        });
      }
      board.push(cellCol);
    }
    this.grid = board;
    return new Grid(this.winCallback, this.grid, false, false, 0);
  }

  destroy() {
    return new Grid();
  }

  generateRandomValue() {
    let initialValue = Math.random();
    if (initialValue < 0.15) {
      return 0;
    } else if (initialValue < 0.7) {
      return 1;
    } else if (initialValue < 0.9) {
      return 2;
    } else {
      return 3;
    }
  }

  checkIfWon() {
    for (let rowIndex = 0; rowIndex < this.grid?.length; rowIndex++) {
      for (
        let colIndex = 0;
        colIndex < this.grid[rowIndex].length;
        colIndex++
      ) {
        const card = this.grid[rowIndex][colIndex];
        if (!card.flipped && card.value > 1) {
          return false;
        }
      }
    }
    return true;
  }

  flipCard(colIndex, rowIndex) {
    this.grid[colIndex][rowIndex].flipped = true;
    let cardValue = this.grid[colIndex][rowIndex].value;
    if (cardValue > 1) {
      this.currentCoins += cardValue;
    }
    if (cardValue === 0) {
      this.lost = true;
    } else if (this.checkIfWon()) {
      this.winCallback(this.currentCoins);
      this.won = true;
    }

    return new Grid(
      this.winCallback,
      this.grid,
      this.won,
      this.lost,
      this.currentCoins
    );
  }

  toggleMemo(colIndex, rowIndex) {
    const memo = this.grid[colIndex][rowIndex].memo;
    this.grid[colIndex][rowIndex].memo = !memo;
    return new Grid(
      this.winCallback,
      this.grid,
      this.won,
      this.lost,
      this.currentCoins
    );
  }

  getColTallies(colIndex) {
    let totalValue = 0;
    let totalBombs = 0;
    for (let index = 0; index < this.grid?.length; index++) {
      const card = this.grid[index][colIndex];
      if (card.value > 0) {
        totalValue += card.value;
      } else {
        totalBombs += 1;
      }
    }
    return {
      value: totalValue,
      bombs: totalBombs,
    };
  }

  getRowTallies(rowIndex) {
    let totalValue = 0;
    let totalBombs = 0;
    const row = this.grid && this.grid.length && this.grid[rowIndex];
    for (let index = 0; index < row?.length; index++) {
      const card = row[index];
      if (card.value > 0) {
        totalValue += card.value;
      } else {
        totalBombs += 1;
      }
    }
    return {
      value: totalValue,
      bombs: totalBombs,
    };
  }
}
