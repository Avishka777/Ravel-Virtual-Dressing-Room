import { useSnapshot } from "valtio";
import { state } from "../store/store";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Slider, TextField, Snackbar } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

export function Overlay() {
  const snap = useSnapshot(state);
  const transition = { type: "spring", duration: 0.8 };
  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
  };
  return (
    <Grid>
      <AnimatePresence>
        {snap.intro ? (
          <motion.section {...config}>
            <Box sx={{ display: "flex", position: "absolute", zIndex: 1 }}>
              <Grid
                item
                lg={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                <Box sx={{ ml: 10, mt: 10 }}>
                  <Typography variant="h2" sx={{ fontFamily: "serif" }}>
                    INTRODUCING THE VIRTUAL DRESSING ROOM
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 5 }}>
                    Offer your customers a truly unique and <br /> personalized
                    shopping experience
                  </Typography>
                  <Button
                    sx={{
                      background: "#fff",
                      width: "9rem",
                      mt: 4,
                    }}
                    onClick={() => (state.intro = false)}
                  >
                    CUSTOMIZE IT
                  </Button>
                </Box>
              </Grid>
            </Box>
          </motion.section>
        ) : (
          <motion.section {...config}>
            <Customizer />
          </motion.section>
        )}
      </AnimatePresence>
    </Grid>
  );
}

export function Customizer() {
  const snap = useSnapshot(state);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleScaleChange = (event, newValue) => {
    state.decalScale = newValue;
  };

  const handlePositionChange = (axis, event, newValue) => {
    state.decalPosition = {
      ...snap.decalPosition,
      [axis]: newValue,
    };
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      state.decal = reader.result;
      setOpenSnackbar(true);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    state.decalScale = 1;
    state.decalPosition = { x: 0, y: 0, z: 0 };
    state.color = "#fff";
  };

  return (
    <Grid>
      <Grid
        style={{
          position: "absolute",
          zIndex: 1,
          right: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            border: "4px solid white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            margin: 2,
            borderRadius: 1,
            padding: 2,
          }}
        >
          <Typography variant="h6" sx={{ color: "#fff", mt: 2 }}>
            Scale
          </Typography>
          <Slider
            value={snap.decalScale}
            min={0.1}
            max={1}
            step={0.01}
            onChange={handleScaleChange}
            sx={{ width: "80%", color: "#fff" }}
          />
          <Typography variant="h6" sx={{ color: "#fff", mt: 2 }}>
            Position X
          </Typography>
          <Slider
            value={snap.decalPosition.x}
            min={-0.5}
            max={0.5}
            step={0.01}
            onChange={(e, val) => handlePositionChange("x", e, val)}
            sx={{ width: "80%", color: "#fff" }}
          />
          <Typography variant="h6" sx={{ color: "#fff", mt: 2 }}>
            Position Y
          </Typography>
          <Slider
            value={snap.decalPosition.y}
            min={-0.5}
            max={0.5}
            step={0.01}
            onChange={(e, val) => handlePositionChange("y", e, val)}
            sx={{ width: "80%", color: "#fff" }}
          />
          <Typography variant="h6" sx={{ color: "#fff", mt: 2 }}>
            Position Z
          </Typography>
          <Slider
            value={snap.decalPosition.z}
            min={-0.5}
            max={0.5}
            step={0.01}
            onChange={(e, val) => handlePositionChange("z", e, val)}
            sx={{ width: "80%", color: "#fff" }}
          />
          <Typography variant="h6" sx={{ color: "#fff", mt: 2 }}>
            Custom Color
          </Typography>
          <TextField
            type="color"
            value={snap.color}
            onChange={(e) => (state.color = e.target.value)}
            sx={{
              width: "100%",
              mt: 1,
            }}
          />

          <Button
            sx={{ background: "#fff", width: "8rem", mt: 2 }}
            onClick={handleReset}
          >
            Reset
          </Button>
        </Box>
      </Grid>
      <Grid
        style={{
          position: "absolute",
          zIndex: 1,
          left: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            border: "4px solid white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            margin: 2,
            borderRadius: 1,
            padding: 2,
          }}
        >
          {snap.decals.map((decal) => (
            <Box
              key={decal}
              sx={{
                border: "2px solid #ddd",
                borderRadius: "8px",
                overflow: "hidden",
                cursor: "pointer",
                mt: 1,
                "&:hover": {
                  borderColor: "#333",
                },
              }}
              onClick={() => (state.decal = decal)}
            >
              <img
                src={decal}
                alt="brand"
                style={{
                  width: "120px",
                  maxHeight: "120px",
                  height: "auto",
                  padding: "5px",
                }}
              />
            </Box>
          ))}
          <Box>
            <Typography variant="h6" mt={3} sx={{ color: "#fff" }}>
              Try Your Image
            </Typography>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="file-upload"
              type="file"
              onChange={handleImageUpload}
            />
            <label htmlFor="file-upload">
              <Button
                sx={{
                  marginTop: "0.5rem",
                  background: "#0693E3",
                  "&:hover": { backgroundColor: "#0574B2" },
                  position: "relative",
                }}
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                Upload File
              </Button>
            </label>
          </Box>
          <Button
            sx={{ background: "#fff", width: "8rem", mt: 2 }}
            onClick={() => {
              const link = document.createElement("a");
              link.setAttribute("download", "canvas.png");
              link.setAttribute(
                "href",
                document
                  .querySelector("canvas")
                  .toDataURL("image/png")
                  .replace("image/png", "image/octet-stream")
              );
              link.click();
            }}
          >
            <FileDownloadIcon sx={{ marginRight: "0.5rem" }} />
            Download
          </Button>
        </Box>
      </Grid>
      {/* Snackbar for upload feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Image uploaded successfully!"
        action={
          <Button color="inherit" onClick={() => setOpenSnackbar(false)}>
            <CloseIcon />
          </Button>
        }
      />
    </Grid>
  );
}
