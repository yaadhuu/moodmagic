// client/src/components/Sidebar.jsx
import React from 'react';
import { FaHome, FaSmile, FaSearch } from 'react-icons/fa'; // Removed FaHeart

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="app-title">Mood Magic</h2>
      <nav>
        <ul>
          <li>
            <a href="#home" className="active">
              <FaHome className="icon" /> Home
            </a>
          </li>
          <li>
            <a href="#moods">
              <FaSmile className="icon" /> Moods
            </a>
          </li>
          {/* Removed Favorites as per request */}
          {/* <li>
            <a href="#favorites">
              <FaHeart className="icon" /> Favorites
            </a>
          </li> */}
          <li>
            <a href="#search">
              <FaSearch className="icon" /> Search
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}