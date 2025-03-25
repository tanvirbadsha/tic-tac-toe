import React from "react";

export default function GameOver({ winner, onHandleRematch }) {
  return (
    <div id="game-over">
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It's a draw</p>}
      <button onClick={onHandleRematch}>Rematch!</button>
    </div>
  );
}
