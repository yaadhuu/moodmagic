// client/src/components/SongRecommendations.jsx
import React from 'react';
// Removed: import '../styles/SongRecommendations.css'; // Styles now in App.css

export default function SongRecommendations({ songs, onSelectSong }) {
  // Ensure songs is an array before checking length
  if (!Array.isArray(songs) || songs.length === 0) {
    return <p className="no-songs-message">No recommendations found. Try a different selection!</p>;
  }

  return (
    <div className="song-recommendations">
      <h2 className="recommendations-title">Recommended for you</h2>
      <div className="song-list">
        {songs.map((song) => (
          <div key={song.trackId} className="song-card" onClick={() => onSelectSong(song)}>
            <img
              src={song.artworkUrl100 || 'https://placehold.co/100x100/1e1e1e/b3b3b3?text=No+Art'}
              alt={`${song.trackName} Album Art`}
              className="song-artwork"
            />
            <div className="song-info">
              <p className="song-title">{song.trackName}</p>
              <p className="song-artist">{song.artistName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}