// client/src/components/MoodPage.jsx
import React from "react";
import MoodSelector from "./MoodSelector";
import IntentSelector from "./IntentSelector";
import SongRecommendations from "./SongRecommendations"; // Use SongRecommendations
// Removed: import "../styles/MoodPage.css"; // Styles now in App.css

export default function MoodPage({
  mood,
  setMood,
  intent,
  setIntent,
  recommendedSongs,
  onSelectSong,
}) {
  return (
    <div className="mood-page-content">
      {/* Selector Section: Mood and Intent side-by-side */}
      <div className="selector-section-wrapper">
        {/* Mood Selector Card */}
        <div className="selector-component">
          <h2>Choose Mood</h2>
          <MoodSelector onSelect={setMood} selectedMood={mood} />
        </div>

        {/* Intent Selector Card - Only show if a mood is selected */}
        {mood && (
          <div className="selector-component">
            <h2>Choose Intent</h2>
            <IntentSelector onSelect={setIntent} selectedIntent={intent} />
          </div>
        )}
      </div>

      {/* Song Recommendations Section */}
      {mood && intent ? (
        <SongRecommendations songs={recommendedSongs} onSelectSong={onSelectSong} />
      ) : (
        <p className="no-songs-message">Select a mood and an intent to get personalized music recommendations!</p>
      )}
    </div>
  );
}