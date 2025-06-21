import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import MoodPage from "./components/MoodPage";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import MusicPlayerBar from "./components/MusicPlayerBar";
import AnimatedCursor from "react-animated-cursor";
import { Element, scroller } from "react-scroll";
import axios from "axios";
import "./App.css"; // Only one CSS import now!

export default function App() {
  const [entered, setEntered] = useState(false);
  const [mood, setMood] = useState(null);
  const [intent, setIntent] = useState(null);
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]); // State for filtered songs

  // IMPORTANT: Replace "YOUR_RENDER_BACKEND_URL_HERE" with your actual Render backend URL
  // Example: "https://mood-magic-backend-xyz123.onrender.com"
  const backendBaseUrl = "https://moodmagic.onrender.com"; 


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
          // Use the dynamic backendBaseUrl for the API call
          const res = await axios.post(`${backendBaseUrl}/api/song`, { mood, intent });
          setRecommendedSongs(res.data); // Backend now returns an array
          setCurrentSong(null); // Clear current song when new recommendations load
        } catch (error) {
          console.error("Error fetching recommendations:", error);
          setRecommendedSongs([]);
          // Provide user feedback, e.g., "Failed to load songs. Please try again."
        }
      } else {
        setRecommendedSongs([]); // Clear if mood/intent is not selected
      }
    };
    fetchRecommendations();
  }, [mood, intent, backendBaseUrl]); // Added backendBaseUrl to dependency array

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
        color="0, 0, 0" // Black cursor for white landing page
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
              recommendedSongs={filteredSongs}
              onSelectSong={setCurrentSong} // Pass function to set current song for playback
            />
          </div>
          <MusicPlayerBar currentSong={currentSong} />
        </Element>
      )}
    </>
  );
}
