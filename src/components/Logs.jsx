import React from "react";

export default function Logs({ gameTurn }) {
  return (
    <ol id="log">
      {gameTurn?.map((log, index) => {
        return (
          <li key={index}>
            Player {log?.player} selected ({log?.board?.row} {log?.board?.col})
          </li>
        );
      })}
    </ol>
  );
}
