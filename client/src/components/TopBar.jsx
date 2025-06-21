// client/src/components/TopBar.jsx
import React from "react";
import "../styles/TopBar.css"; // Corrected import path

export default function TopBar({ onSearchChange }) {
  return (
    <div className="top-bar">
      <h1>Discover</h1>
      <p>Find your next favorite song.</p>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search songs or artists..."
          className="search-input"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}