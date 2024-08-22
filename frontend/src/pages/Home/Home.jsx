import { Divider, Grid, Typography } from "@mui/material";
import Chatbot from "../../component/Chatbot";
import video from "../../assets/main/home.mp4";
import AllClothing from "../../component/AllClothing";

const Home = () => {
  return (
    <Grid>
      <Grid container>
        {/* Video Section */}
        <video
          src={video}
          autoPlay
          loop
          muted
          style={{
            width: "100%",
          }}
        />
      </Grid>

      {/* Chatbot Section */}
      <Chatbot />

      {/* Clothing Men Section */}
      <Grid sx={{ p: 10 }}>
        <Typography variant="h3" sx={{ color: "#003366" }}>
          DEALS YOU DONT WANT TO MISS
        </Typography>
        <Divider sx={{ borderWidth: "2px", borderColor: "#003366", mb: 3 }} />
        <AllClothing />
      </Grid>
    </Grid>
  );
};

export default Home;
