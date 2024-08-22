import { Divider, Grid, Typography } from "@mui/material";
import Chatbot from "../../component/Chatbot";
import video from "../../assets/main/home.mp4";

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

    </Grid>
  );
};

export default Home;
