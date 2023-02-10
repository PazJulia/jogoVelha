import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  gameData = this.initializeGame();
  winPositions = this.setWinPositions();
  player1 = '1';
  player2 = '2';
  stateGameText = `Vez do Jogador ${this.player1}`;
  symbol1 = 'X';
  symbol2 = 'O';
  symbolTurn = this.symbol1;
  clickedButtonCount = 0;
  isGameOver = false;

  changeButtonStatus(rowIndex: number, colIndex: number): void {
    this.gameData[rowIndex][colIndex].value = this.symbolTurn;
    this.gameData[rowIndex][colIndex].disabled = true;
    this.clickedButtonCount++;
    this.verifyWinner(rowIndex, colIndex);
    if (this.verifyGameOver()) return;
    this.setPlayerTurn();
  }

  initializeGame(): any {
    let gameData = this.initializeArrays();
    gameData = this.initializeArrayData(gameData);
    return gameData;
  }

  initializeArrays(): any {
    let array = [];
    for(let i = 0; i < 3; i++) {
      array.push([{}, {}, {}]);
    }
    return array;
  }

  initializeArrayData(array: [any]): any {
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        array[i][j] = {value: '', disabled: false, gameWinStatus: false};
      }
    }
    return array;
  }

  setPlayerTurn() {
    if (this.isGameOver) return;
    if(this.symbolTurn === this.symbol1) {
      this.stateGameText = `Vez do Jogador ${this.player2}`;
      this.symbolTurn = this.symbol2;
    } else {
      this.stateGameText = `Vez do Jogador ${this.player1}`;
      this.symbolTurn = this.symbol1;
    }
  }

  verifyWinner(rowIndex: number, colIndex: number) {
    this.winPositions.forEach((rowPositions: any[]) => {
      const positionsFoundIndex = rowPositions.findIndex(item => item.row === rowIndex && item.col === colIndex);
      if (positionsFoundIndex != -1) {
        let winArray = [];
        rowPositions.forEach(column => {
          if (this.gameData[column.row][column.col].value === this.symbolTurn) {
            winArray.push(true);
          }
        });
        if (winArray.length === 3) {
          this.setWinner(rowPositions);
          return;
        }
      }
    });
  }

  setWinner(row: any[]) {
    row.forEach(column => {
      this.gameData[column.row][column.col].gameWinStatus = true;
    });
    this.gameData.forEach((row: any[]) => {
      row.forEach((column: any) => {
        column.disabled = true;
      });
    });
    this.stateGameText = this.symbolTurn === this.symbol1 ?
      `O Jogador ${this.player1} venceu!` :
      `O Jogador ${this.player2} venceu!`;
    this.isGameOver = true;
  }

  verifyGameOver(): boolean {
    if (this.clickedButtonCount === 9 && !this.isGameOver) {
      this.stateGameText = 'Deu Velha!';
      this.isGameOver = true;
      return true;
    } else return false;
  }

  setWinPositions(): any {
    return [
      [{row: 0, col: 0}, {row: 0, col: 1}, {row: 0, col: 2}],
      [{row: 1, col: 0}, {row: 1, col: 1}, {row: 1, col: 2}],
      [{row: 2, col: 0}, {row: 2, col: 1}, {row: 2, col: 2}],
      [{row: 0, col: 0}, {row: 1, col: 0}, {row: 2, col: 0}],
      [{row: 0, col: 1}, {row: 1, col: 1}, {row: 2, col: 1}],
      [{row: 0, col: 2}, {row: 1, col: 2}, {row: 2, col: 2}],
      [{row: 0, col: 0}, {row: 1, col: 1}, {row: 2, col: 2}],
      [{row: 0, col: 2}, {row: 1, col: 1}, {row: 2, col: 0}]
    ];
  }
}
