// client/src/components/MoodSelector.jsx
import React from "react";
// Removed: import "../styles/MoodSelector.css"; // Styles now in App.css

const moods = ["Happy", "Sad", "Energetic", "Calm"];

export default function MoodSelector({ onSelect, selectedMood }) {
  return (
    <div className="btn-group">
      {moods.map((m) => (
        <button
          key={m}
          onClick={() => onSelect(m)}
          className={`selector-btn ${selectedMood === m ? "selected" : ""}`}
        >
          {m}
        </button>
      ))}
    </div>
  );
}