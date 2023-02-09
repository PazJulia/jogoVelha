import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  gameData = this.initializeGame();
  winPositions = this.setWinPositions();
  player1 = 'Jogador 1';
  player2 = 'Jogador 2';
  playerTurn = this.player1;
  symbol1 = 'X';
  symbol2 = 'O';
  symbolTurn = this.symbol1;

  changeButtonStatus(rowIndex: number, colIndex: number): void {
    this.gameData[rowIndex][colIndex].value = this.symbolTurn;
    this.gameData[rowIndex][colIndex].disabled = true;
    this.verifyWinner(rowIndex, colIndex);
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
    if(this.playerTurn === this.player1) {
      this.playerTurn = this.player2;
      this.symbolTurn = this.symbol2;
    } else {
      this.playerTurn = this.player1;
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
          rowPositions.forEach(column => {
            this.gameData[column.row][column.col].gameWinStatus = true;
          });
          return;
        }
      }
    });
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
