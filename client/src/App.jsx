// client/src/App.jsx
import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import MoodPage from "./components/MoodPage";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import MusicPlayerBar from "./components/MusicPlayerBar";
import AnimatedCursor from "react-animated-cursor";
import { Element, scroller } from "react-scroll";
import axios from "axios";
import "./App.css";

export default function App() {
  const [entered, setEntered] = useState(false);
  const [mood, setMood] = useState(null);
  const [intent, setIntent] = useState(null);
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]); // New state for filtered songs

  const handleEnter = () => {
    setEntered(true);
    setTimeout(() => {
      scroller.scrollTo("mood-magic-app-section", {
        duration: 1000,
        smooth: true,
      });
    }, 100);
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (mood && intent) {
        try {
          const res = await axios.post("http://localhost:5000/api/song", { mood, intent });
          setRecommendedSongs(res.data);
          setCurrentSong(null);
        } catch (error) {
          console.error("Error fetching recommendations:", error);
          setRecommendedSongs([]);
        }
      } else {
        setRecommendedSongs([]);
      }
    };
    fetchRecommendations();
  }, [mood, intent]);

  // Effect to filter songs whenever recommendedSongs or searchTerm changes
  useEffect(() => {
    if (searchTerm) {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filtered = recommendedSongs.filter(song =>
        song.trackName.toLowerCase().includes(lowercasedSearchTerm) ||
        song.artistName.toLowerCase().includes(lowercasedSearchTerm)
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(recommendedSongs); // If no search term, show all recommended songs
    }
  }, [recommendedSongs, searchTerm]);


  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        color="0, 0, 0"
        outerAlpha={0.3}
        innerScale={1}
        outerScale={2}
        clickables={["button", ".song-card", "input[type='text']"]}
      />

      <Element name="landing">
        {!entered && <LandingPage onEnter={handleEnter} />}
      </Element>

      {entered && (
        <Element name="mood-magic-app-section" className="app-container">
          <Sidebar />
          <div className="main-content-area">
            <TopBar onSearchChange={handleSearchChange} />
            <MoodPage
              mood={mood}
              setMood={setMood}
              intent={intent}
              setIntent={setIntent}
              recommendedSongs={filteredSongs} // This line is now clean
              onSelectSong={setCurrentSong}
            />
          </div>
          <MusicPlayerBar currentSong={currentSong} />
        </Element>
      )}
    </>
  );
}