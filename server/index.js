import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

// Configure CORS
// For development, process.env.CORS_ORIGIN might be undefined, so it defaults to localhost.
// In production on Render, you will set CORS_ORIGIN to your Vercel frontend URL.
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000", // Default for local dev, updated by ENV var on Render
  methods: ["GET", "POST"], // Allow GET and POST requests
  credentials: true, // Allow sending cookies/authorization headers if needed (though not used currently)
}));

app.use(express.json()); // Middleware to parse JSON request bodies

// API endpoint to fetch songs based on mood and intent
app.post("/api/song", async (req, res) => {
  const { mood, intent } = req.body; // Receive both mood and intent from the frontend
  
  // Define search term based on mood. You can add more complex logic here
  // to incorporate 'intent' more deeply if the iTunes API allowed it,
  // or if you were integrating with a more sophisticated music API.
  let searchTerm = mood; 

  // Basic logic to enhance search term based on intent
  if (mood === "Sad" && intent === "Uplift") {
      searchTerm = "uplifting music";
  } else if (mood === "Calm" && intent === "Energetic") {
      searchTerm = "upbeat music";
  }
  // Add other mood/intent combinations as needed for diverse results.

  try {
    // Make a request to the iTunes Search API
    const { data } = await axios.get("https://itunes.apple.com/search", {
      params: {
        term: searchTerm,   // The combined search term
        media: "music",     // Filter results to music only
        entity: "song",     // Specifically search for songs (not albums, artists, etc.)
        limit: 20,          // Fetch up to 20 songs for recommendations
      },
    });

    // Check if results were returned and filter for playable songs
    if (data.results && data.results.length > 0) {
      const playableSongs = data.results.filter(song => song.previewUrl); // Ensure song has a preview URL
      if (playableSongs.length > 0) {
        res.json(playableSongs); // Send the array of playable songs back to the frontend
      } else {
        res.status(404).json({ message: "No playable songs found for this mood and intent." });
      }
    } else {
      res.status(404).json({ message: "No songs found for this mood/intent combination." });
    }
  } catch (error) {
    // Log detailed error on the server side
    console.error("Error fetching songs from iTunes API:", error.message);
    // Send a generic error message to the frontend
    res.status(500).json({ message: "Error fetching songs from external API.", details: error.message });
  }
});

// The server listens on the port provided by the hosting environment (Render)
// or defaults to 5000 for local development.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));