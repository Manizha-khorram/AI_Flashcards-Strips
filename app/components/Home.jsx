"use client";

import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Link,
} from "@mui/material";
import { useRouter } from "next/navigation";

const fetchFlashcards = async (text) => {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to generate flashcards");
    }

    const data = await response.json();
    return data.flashcards;
  } catch (error) {
    console.error("Error generating flashcards:", error);
    alert("An error occurred while generating flashcards. Please try again.");
    return [];
  }
};

const fetchYouTubeLinks = async (query) => {
  try {
    const response = await fetch(`/api/youtube?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error("Failed to fetch YouTube links");
    }
    const data = await response.json();
    console.log("Fetched YouTube Links:", data); // Check the data structure
    return Array.isArray(data.links) ? data.links : []; // Ensure data.links is an array
  } catch (error) {
    console.error("Error fetching YouTube links:", error);
    alert("An error occurred while fetching YouTube links. Please try again.");
    return []; // Return an empty array on error
  }
};


export default function Home() {
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [links, setLinks] = useState([]); // Ensure links is always an array
  const [flipped, setFlipped] = useState({});
  const [name, setName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter some text to generate flashcards.");
      return;
    }
  
    try {
      const flashcards = await fetchFlashcards(text);
      setFlashcards(flashcards);
  
      const searchTerm = flashcards.length > 0 ? flashcards[0].front : text;
      const links = await fetchYouTubeLinks(searchTerm);
      console.log("Fetched YouTube Links:", links); // Add this line
      setLinks(links);
    } catch (error) {
      console.error("Error processing request:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const handleSaveFlashcards = async () => {
    // Implementation for saving flashcards
    handleCloseDialog();
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            width: "100%",
            maxWidth: "md",
            p: 2,
            bgcolor: "transparent",
            mb: 2,
          }}
        >
          <TextField
            id="standard-textarea"
            placeholder="Write here!"
            variant="standard"
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="What is in your mind!"
            fullWidth
            multiline
            rows={4}
            sx={{
              mb: 2,
              borderRadius: 2,
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "transparent",
                "& fieldset": {
                  borderColor: "#90caf9 !important",
                },
                "&:hover fieldset": {
                  borderColor: "#64b5f6 !important",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#42a5f5 !important",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#80808094",
                "&.Mui-focused": {
                  color: "#80808094",
                },
              },
            }}
          />
        </Paper>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          sx={{ mb: 4 }}
        >
          Generate Flashcards
        </Button>
      </Box>

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Generated Flashcards
          </Typography>
          <Grid container spacing={2}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                    bgcolor: "#060a1a",
                    color: "white",
                    height: "200px",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    perspective: "1000px",
                  }}
                >
                  <CardActionArea onClick={() => handleCardClick(index)}>
                    <CardContent
                      sx={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        transformStyle: "preserve-3d",
                        transition: "transform 0.6s",
                        transform: flipped[index] ? "rotateY(180deg)" : "rotateY(0deg)",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          backfaceVisibility: "hidden",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 2,
                          boxSizing: "border-box",
                          textAlign: "center",
                          wordWrap: "break-word",
                          bgcolor: "#060a1a",
                          border: "1px solid #014258",
                        }}
                      >
                        <Typography variant="h6" align="center">
                          {flashcard.front}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          backfaceVisibility: "hidden",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 2,
                          boxSizing: "border-box",
                          textAlign: "center",
                          wordWrap: "break-word",
                          bgcolor: "#014258",
                          color: "white",
                          border: "1px solid #014258",
                          transform: "rotateY(180deg)",
                        }}
                      >
                        <Typography variant="h6" align="center">
                          {flashcard.back}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleOpenDialog}
              sx={{ mt: 2, mb: 4 }}
            >
              Save Flashcards
            </Button>
          </Box>
        </Box>
      )}

{links.length > 0 && (
  <Box sx={{ mt: 4 }}>
    <Typography variant="h5" component="h2" gutterBottom>
      Related YouTube Videos
    </Typography>
    <Grid container spacing={2}>
      {links.map((link, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            sx={{
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              bgcolor: "#060a1a",
              color: "white",
              height: "150px",
            }}
          >
            <CardActionArea component="a" href={link} target="_blank">
              <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                  YouTube Video {index + 1}
                </Typography>
                <Link href={link} target="_blank" sx={{ color: "primary.main" }}>
                  Watch Video
                </Link>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
)}


      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Save Flashcards</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name to save your flashcards.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Flashcard Set Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveFlashcards}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
