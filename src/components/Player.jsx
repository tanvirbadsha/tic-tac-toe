import React, { useState } from "react";

export default function Player({ name: initialName, symbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);

  const handleEditButton = ({ isActive }) => {
    setIsEditing((p) => !p);
  };
  let playerName = isEditing ? (
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
    />
  ) : (
    <span className="player-name">{name}</span>
  );
  return (
    <li className={isActive ? "active" : ""} id="player1">
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditButton}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
