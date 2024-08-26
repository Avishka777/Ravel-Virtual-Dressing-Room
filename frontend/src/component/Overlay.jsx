import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import { state } from "../store/store";
import { Box, Button, Grid, Typography, Slider } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

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
                <Box sx={{ ml: 10, mt: 20 }}>
                  <Typography variant="h2" sx={{ fontFamily: "serif" }}>
                    INTRODUCING THE <br />
                    VIRTUAL DRESSING ROOM
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

  const handleScaleChange = (event, newValue) => {
    state.decalScale = newValue;
  };

  const handlePositionChange = (axis, event, newValue) => {
    state.decalPosition = {
      ...snap.decalPosition,
      [axis]: newValue,
    };
  };

  return (
    <Grid>
      <Grid
        style={{
          position: "absolute",
          zIndex: 1,
          right: 2,
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
          <Typography variant="h4" sx={{ color: "#fff" }}>
            Select Color
          </Typography>
          {snap.colors.map((color) => (
            <Box
              key={color}
              className={`circle`}
              style={{
                backgroundColor: color,
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                margin: "10px",
                cursor: "pointer",
                border: "4px solid white",
              }}
              onClick={() => (state.color = color)}
            ></Box>
          ))}
          <Button
            sx={{ background: "#fff", width: "9rem", mt: 1 }}
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
      <Grid
        sx={{
          display: "flex",
          position: "absolute",
          zIndex: 1,
          left: 2,
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
                my: 1,
                "&:hover": {
                  borderColor: "#333",
                },
              }}
              onClick={() => (state.decal = decal)}
            >
              <img
                src={decal}
                alt="brand"
                style={{ width: "80px", maxHeight: "80px", height: "auto" }}
              />
            </Box>
          ))}
        </Box>
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
        </Box>
      </Grid>
    </Grid>
  );
}
