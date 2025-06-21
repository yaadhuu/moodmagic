// client/src/components/MusicCard.jsx
import React from 'react';

export default function MusicCard({ song, onClick }) {
  if (!song) return null;

  return (
    <div className="music-card" onClick={() => onClick(song)}>
      <div className="music-card-image">
        <img src={song.artworkUrl100 || 'https://via.placeholder.com/100'} alt={song.trackName} />
      </div>
      <div className="music-card-info">
        <h4 className="music-card-title">{song.trackName || 'Unknown Title'}</h4>
        <p className="music-card-artist">{song.artistName || 'Unknown Artist'}</p>
      </div>
    </div>
  );
}