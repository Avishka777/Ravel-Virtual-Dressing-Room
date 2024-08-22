import { Box, Typography, Link, Divider, Grid } from "@mui/material";
import logo from "../assets/main/logowhite.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#003366",
        color: "white",
        padding: 5,
      }}
    >
      <Grid container mb={2}>
        {/* Logo Section */}
        <Grid item md={6} sm={12} xs={12} sx={{ mb: { xs: 3, md: 0 } }}>
          <img
            src={logo}
            alt="logo"
            style={{
              height: "55px",
            }}
          />
        </Grid>

        {/* Resources Section */}
        <Grid item md={2} sm={4} xs={12} sx={{ mb: { xs: 3, sm: 0 } }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", marginBottom: "10px" }}
          >
            RESOURCES
          </Typography>
          <Link
            href="#"
            color="inherit"
            sx={{ display: "block", marginBottom: "5px" }}
          >
            About Us
          </Link>
          <Link
            href="#"
            color="inherit"
            sx={{ display: "block", marginBottom: "5px" }}
          >
            Contact Us
          </Link>
        </Grid>

        {/* Follow Us Section */}
        <Grid item md={2} sm={4} xs={12} sx={{ mb: { xs: 3, sm: 0 } }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", marginBottom: "10px" }}
          >
            FOLLOW US
          </Typography>
          <Link
            href="#"
            color="inherit"
            sx={{ display: "block", marginBottom: "5px" }}
          >
            Facebook
          </Link>
          <Link
            href="#"
            color="inherit"
            sx={{ display: "block", marginBottom: "5px" }}
          >
            Instagram
          </Link>
        </Grid>

        {/* Legal Section */}
        <Grid item md={2} sm={4} xs={12} sx={{ mb: { xs: 3, sm: 0 } }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", marginBottom: "10px" }}
          >
            LEGAL
          </Typography>
          <Link
            href="#"
            color="inherit"
            sx={{ display: "block", marginBottom: "5px" }}
          >
            Refund Policy
          </Link>
          <Link
            href="#"
            color="inherit"
            sx={{ display: "block", marginBottom: "5px" }}
          >
            Privacy Policy
          </Link>
        </Grid>
      </Grid>

      {/* Bottom Section */}
      <Divider />
      <Box
        sx={{
          paddingTop: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2">
          &copy; 2024 RAVEL CLOTHING. All Rights Reserved.
        </Typography>
        <Box>
          <Link href="#" color="inherit" sx={{ marginRight: "15px" }}>
            <FacebookIcon />
          </Link>
          <Link href="#" color="inherit">
            <InstagramIcon />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
