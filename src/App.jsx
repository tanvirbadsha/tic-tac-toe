import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Logs from "./components/Logs";
import { WINNING_COMBINATIONS } from "./data/winningCombination";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function deriveActivePlayer(gameTurn) {
  let currentPlayer = "X";

  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function App() {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  const [gameTurn, setGameTurn] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurn);

  const handleSelectSquare = (rowIndex, colIndex, symbol) => {
    setGameBoard((prevBoard) => {
      // updating array values in an immutable way.
      const updatedBoard = [...prevBoard.map((innerArr) => [...innerArr])];
      updatedBoard[rowIndex][colIndex] = symbol;
      return updatedBoard;
    });
    setGameTurn((prevBoard) => {
      const currentPlayer = deriveActivePlayer(prevBoard);
      const updatedBoard = [
        {
          board: {
            row: rowIndex,
            col: colIndex,
          },
          player: currentPlayer,
        },
        ...prevBoard,
      ];
      return updatedBoard;
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>{" "}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          symbol={activePlayer}
          gameBoard={gameBoard}
        />
      </div>
      <Logs gameTurn={gameTurn} />
    </main>
  );
}

export default App;
