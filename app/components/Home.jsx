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
} from "@mui/material";
import { useRouter } from "next/navigation";
import { collection, getDoc, writeBatch, doc } from "firebase/firestore";

export default function Generate() {
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter some text to generate flashcards.");
      return;
    }

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
      setFlashcards(data.flashcards);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("An error occurred while generating flashcards. Please try again.");
    }
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);
  const saveFlashcards = async () => {
    if (!name.trim()) {
      alert("Please enter a name for your flashcard set.");
      return;
    }

    try {
      const userDocRef = doc(collection(db, "users"), "user_id_here"); // Replace with actual user ID
      const userDocSnap = await getDoc(userDocRef);

      const batch = writeBatch(db);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedSets = [...(userData.flashcardSets || []), { name }];
        batch.update(userDocRef, { flashcardSets: updatedSets });
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name }] });
      }

      const setDocRef = doc(collection(userDocRef, "flashcardSets"), name);
      batch.set(setDocRef, { flashcards });

      await batch.commit();

      alert("Flashcards saved successfully!");
      handleClose();
      setName("");
    } catch (error) {
      console.error("Error saving flashcards:", error);
      alert("An error occurred while saving flashcards. Please try again.");
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          my: 4,
          mt: 4,
          mb: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{ width: "100%", maxWidth: "md", p: 2, bgcolor: "transparent" }}
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
              borderColor: "white",
              bgcolor: "transparent",
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
          variant="outlined"
          color="primary"
          onClick={handleSubmit}
          fullWidth
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
                  }}
                >
                  <CardActionArea onClick={() => handleCardClick(index)}>
                    <CardContent>
                      <Box
                        sx={{
                          perspective: "1000px",
                          position: "relative",
                          width: "100%",
                          height: "200px",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        <Box
                          sx={{
                            transformStyle: "preserve-3d",
                            transition: "transform 0.6s",
                            transform: flipped[index]
                              ? "rotateY(180deg)"
                              : "rotateY(0deg)",
                            position: "absolute",
                            width: "100%",
                            height: "100%",
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
                              border: "1px solid #014258", // Light blue border
                              textOverflow: "ellipsis",
                              whiteSpace: "normal",
                              overflowY: "auto",
                              textAlign: "center",
                              wordWrap: "break-word",
                            }}
                          >
                            <Typography
                              variant="h6"
                              align="center"
                              sx={{
                                overflow: "auto",
                                textOverflow: "ellipsis",
                                whiteSpace: "normal",
                              }}
                            >
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
                              border: "1px solid #014258", // Light blue border
                              transform: "rotateY(180deg)",
                              whiteSpace: "normal",
                              overflowY: "auto",
                              textAlign: "center",
                              wordWrap: "break-word",
                            }}
                          >
                            <Typography
                              variant="h6"
                              align="center"
                              sx={{
                                lineHeight: 2,
                              }}
                            >
                              {flashcard.back}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}></Box>
        </Box>
      )}

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Save Flashcard Set</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcard set.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Set Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={saveFlashcards}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
