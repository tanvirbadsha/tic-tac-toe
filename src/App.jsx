import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Logs from "./components/Logs";
import { WINNING_COMBINATIONS } from "./data/winningCombination";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
let winner;
function deriveActivePlayer(gameTurn) {
  let currentPlayer = "X";

  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function App() {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState({
    x: "player 1",
    y: "player 2",
  });

  // to show player name when game is over.
  const handleSaveClick = (newName, symbol) => {
    setPlayerNames({
      ...playerNames,
      [symbol]: newName,
    });
  };

  // for game logic start
  const activePlayer = deriveActivePlayer(gameTurns);

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;
  // to show symbols in the square.
  const handleSelectSquare = (rowIndex, colIndex, symbol) => {
    setGameBoard((prevBoard) => {
      // updating array values in an immutable way.
      const updatedBoard = [...prevBoard.map((innerArr) => [...innerArr])];
      updatedBoard[rowIndex][colIndex] = symbol;
      return updatedBoard;
    });
    setGameTurns((prevBoard) => {
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
  // for rematch logic
  const handleRematch = () => {
    setGameBoard(initialGameBoard);
    setGameTurns([]);
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>{" "}
        {(winner || hasDraw) && (
          <GameOver winner={winner} onHandleRematch={handleRematch} />
        )}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          symbol={activePlayer}
          gameBoard={gameBoard}
        />
      </div>
      <Logs gameTurn={gameTurns} />
    </main>
  );
}

export default App;
