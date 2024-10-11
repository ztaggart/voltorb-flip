export const GRID_WIDTH = 5;
export const GRID_HEIGHT = 5;
export const LAYOUT_CHOICES = [
  [
    [3, 1, 6],
    [0, 3, 6],
    [5, 0, 6],
    [2, 2, 6],
    [4, 1, 6],
  ],
  [
    [1, 3, 7],
    [6, 3, 7],
    [3, 2, 7],
    [0, 4, 7],
    [5, 1, 7],
  ],
  [
    [2, 3, 8],
    [7, 0, 8],
    [4, 2, 8],
    [1, 4, 8],
    [6, 1, 8],
  ],
  [
    [3, 3, 8],
    [0, 5, 8],
    [5, 0, 10],
    [5, 2, 10],
    [2, 4, 10],
  ],
  [
    [7, 1, 10],
    [4, 3, 10],
    [1, 5, 10],
    [9, 0, 10],
    [6, 2, 10],
  ],
  [
    [3, 4, 10],
    [0, 6, 10],
    [8, 1, 10],
    [5, 3, 10],
    [2, 5, 10],
  ],
  [
    [7, 2, 10],
    [4, 4, 10],
    [1, 6, 10],
    [9, 1, 10],
    [6, 3, 10],
  ],
  [
    [0, 7, 10],
    [8, 2, 10],
    [5, 4, 10],
    [2, 6, 10],
    [7, 3, 10],
  ],
];

export default class Grid {
  constructor(winCallback, loseCallback, grid, won, lost, currentCoins, level) {
    this.winCallback = winCallback;
    this.loseCallback = loseCallback;
    this.grid = grid;
    this.won = won || false;
    this.lost = lost || false;
    this.currentCoins = currentCoins || 0;
    this.level = level || 1;
  }

  initialize() {
    const valueInfo = this.generateValueInfo(this.level);
    const valuePositions = this.getCardPositions(valueInfo);
    let board = [];
    for (let colIndex = 0; colIndex < GRID_WIDTH; colIndex++) {
      let cellCol = [];
      for (let rowIndex = 0; rowIndex < GRID_HEIGHT; rowIndex++) {
        let valuePos = valuePositions.find(
          (pos) => pos.position === colIndex * GRID_WIDTH + rowIndex
        );
        let value = valuePos !== undefined ? valuePos.value : 1;
        cellCol.push({
          column: 0,
          row: 0,
          memo: false,
          flipped: false,
          value: value,
        });
      }
      board.push(cellCol);
    }
    this.grid = board;
    return new Grid(
      this.winCallback,
      this.loseCallback,
      this.grid,
      false,
      false,
      0,
      this.level
    );
  }

  /**
   * Generates an array of the number of 2s, 3s, and Voltorbs
   * the game will have based on the current level
   * @param {number} level
   * @returns {number[]}
   */
  generateValueInfo(level) {
    let randomLayoutNumber = Math.floor(Math.random() * 5);
    switch (level) {
      case 1:
        return LAYOUT_CHOICES[0][randomLayoutNumber];
      case 2:
        return LAYOUT_CHOICES[1][randomLayoutNumber];
      case 3:
        return LAYOUT_CHOICES[2][randomLayoutNumber];
      case 4:
        return LAYOUT_CHOICES[3][randomLayoutNumber];
      case 5:
        return LAYOUT_CHOICES[4][randomLayoutNumber];
      case 6:
        return LAYOUT_CHOICES[5][randomLayoutNumber];
      case 7:
        return LAYOUT_CHOICES[6][randomLayoutNumber];
      case 8:
      default:
        // 8 and up have same value infos
        return LAYOUT_CHOICES[7][randomLayoutNumber];
    }
  }

  getCardPositions(valueInfo) {
    let cardPositions = [];
    valueInfo.forEach((infoValue, cardPositionIndex) => {
      for (let index = 0; index < infoValue; index++) {
        let randomPosition = Math.floor(
          Math.random() * (GRID_WIDTH * GRID_HEIGHT)
        );
        while (cardPositions.some((pos) => pos.position === randomPosition)) {
          randomPosition = Math.floor(
            Math.random() * (GRID_WIDTH * GRID_HEIGHT)
          );
        }
        let value;
        if (cardPositionIndex === 0) {
          value = 2;
        } else if (cardPositionIndex === 1) {
          value = 3;
        } else {
          value = 0;
        }
        cardPositions.push({ position: randomPosition, value: value });
      }
    });
    return cardPositions.sort((a, b) => {
      return a.position - b.position;
    });
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
      this.currentCoins =
        this.currentCoins <= 0 ? cardValue : this.currentCoins * cardValue;
    }
    if (cardValue === 0) {
      this.lost = true;
      let multCardsFlipped = 0;
      for (let colIndex = 0; colIndex < this.grid.length; colIndex++) {
        for (
          let rowIndex = 0;
          rowIndex < this.grid[colIndex].length;
          rowIndex++
        ) {
          const element = this.grid[colIndex][rowIndex];
          if (element.value > 0 && element.flipped) {
            multCardsFlipped++;
          }
        }
      }
      this.level = Math.max(1, Math.min(this.level, multCardsFlipped));
      this.loseCallback(this.level);
    } else if (this.checkIfWon()) {
      this.level++;
      this.won = true;
      this.winCallback(this.currentCoins, this.level);
      this.currentCoins = 0;
    }

    return new Grid(
      this.winCallback,
      this.loseCallback,
      this.grid,
      this.won,
      this.lost,
      this.currentCoins,
      this.level
    );
  }

  toggleMemo(colIndex, rowIndex) {
    const memo = this.grid[colIndex][rowIndex].memo;
    this.grid[colIndex][rowIndex].memo = !memo;
    return new Grid(
      this.winCallback,
      this.loseCallback,
      this.grid,
      this.won,
      this.lost,
      this.currentCoins,
      this.level
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
