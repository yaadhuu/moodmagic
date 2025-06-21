// client/src/components/IntentSelector.jsx
import React from "react";

// Removed "Relax" and "Focus" as per request
const intents = ["Match", "Uplift"];

export default function IntentSelector({ onSelect, selectedIntent }) {
  return (
    <div className="btn-group">
      {intents.map((intent) => (
        <button
          key={intent}
          onClick={() => onSelect(intent)}
          className={`selector-btn ${selectedIntent === intent ? "selected" : ""}`}
        >
          {intent}
        </button>
      ))}
    </div>
  );
}