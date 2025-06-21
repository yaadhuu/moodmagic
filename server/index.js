// backend/index.js
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/song", async (req, res) => {
  const { mood, intent } = req.body; // Receive both mood and intent
  
  // Basic example: Use mood as search term.
  // For more advanced logic: combine mood and intent to form a more specific query
  // or use an external mood-based music API.
  let searchTerm = mood; 

  // Example: If intent is "Uplift" and mood is "Sad", search for "uplifting music" instead of just "sad"
  if (mood === "Sad" && intent === "Uplift") {
      searchTerm = "uplifting music";
  } else if (mood === "Calm" && intent === "Energetic") {
      searchTerm = "upbeat music"; // Or similar logic
  }
  // You can add more complex logic here based on mood and intent combinations.

  try {
    const { data } = await axios.get("https://itunes.apple.com/search", {
      params: {
        term: searchTerm,
        media: "music",
        entity: "song", // Specifically look for songs
        limit: 20,       // Fetch more songs for recommendations list
      },
    });

    if (data.results && data.results.length > 0) {
      // Return the array of songs directly
      res.json(data.results);
    } else {
      res.status(404).json({ message: "No songs found for this mood/intent." });
    }
  } catch (error) {
    console.error("Error fetching songs from iTunes API:", error);
    res.status(500).json({ message: "Error fetching songs", error: error.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));