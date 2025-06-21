// client/src/components/MusicPlayerBar.jsx
import React, { useEffect, useRef } from "react";
// Removed: import "../styles/MusicPlayerBar.css"; // Styles now in App.css

export default function MusicPlayerBar({ currentSong }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (currentSong && currentSong.previewUrl) {
        audioRef.current.src = currentSong.previewUrl;
        audioRef.current.load();
        audioRef.current.play().catch(error => {
          console.error("Autoplay failed:", error);
          // Autoplay might require user interaction. Consider showing a play button if it fails.
        });
      } else {
        audioRef.current.pause();
        audioRef.current.src = ""; // Clear source if no song
      }
    }
  }, [currentSong]);

  if (!currentSong) {
    return (
      <div className="music-player-bar">
        <p className="player-message">Select a song to start playing!</p>
      </div>
    );
  }

  return (
    <div className="music-player-bar">
      <div className="player-details">
        <img
          src={currentSong.artworkUrl100 || 'https://placehold.co/50x50/1a1a1a/b3b3b3?text=No+Art'}
          alt="Album Art"
          className="player-artwork"
        />
        <div className="player-info">
          <h4 className="player-song-title">{currentSong.trackName}</h4>
          <p className="player-artist-name">{currentSong.artistName}</p>
        </div>
      </div>
      <div className="player-controls">
        <audio ref={audioRef} controls src={currentSong.previewUrl}>
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}