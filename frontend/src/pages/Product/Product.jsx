import { Radio, FormControlLabel, Divider } from "@mui/material";
import { Box, Grid, Typography, Button, RadioGroup } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Product = () => {
  return (
    <Grid>
      <Box sx={{ padding: "40px" }}>
        <Grid container spacing={4}>
          {/* Product Images Section */}
          <Grid item xs={12} md={7}>
            <Box>
              <img
                src="https://via.placeholder.com/600"
                alt="Product"
                style={{ width: "100%", borderRadius: "10px" }}
              />
            </Box>
          </Grid>

          {/* Product Details Section */}
          <Grid item xs={12} md={5}>
            <Box sx={{ textAlign: "left" }}>
              {/* Breadcrumb */}
              <Typography variant="body2" sx={{ marginBottom: "10px" }}>
                Home / LXC Oversized Tee
              </Typography>

              {/* Product Title */}
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                LXC OVERSIZED TEE
              </Typography>

              {/* Price */}
              <Typography
                variant="h5"
                sx={{ margin: "20px 0", fontWeight: "bold" }}
              >
                Rs 3,200.00
              </Typography>

              {/* Payment Options */}
              <Typography variant="body2" sx={{ marginBottom: "10px" }}>
                3 X Rs 1,066.66 or 4.5% Cashback with Mintpay
              </Typography>

              {/* Color Options */}
              <Typography
                variant="body2"
                sx={{ marginBottom: "5px", fontWeight: "bold" }}
              >
                COLOR
              </Typography>
              <Box sx={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <Box
                  sx={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "#000",
                    border: "2px solid #000",
                    cursor: "pointer",
                  }}
                />
                <Box
                  sx={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    border: "2px solid #000",
                    cursor: "pointer",
                  }}
                />
              </Box>

              {/* Size Options */}
              <Typography
                variant="body2"
                sx={{ marginBottom: "5px", fontWeight: "bold" }}
              >
                SIZE
              </Typography>
              <RadioGroup row defaultValue="M" sx={{ marginBottom: "20px" }}>
                {["S", "M", "L", "XL", "2XL"].map((size) => (
                  <FormControlLabel
                    key={size}
                    value={size}
                    control={<Radio />}
                    label={size}
                    sx={{
                      margin: 0,
                      "& .MuiSvgIcon-root": {
                        fontSize: "1.2rem",
                      },
                    }}
                  />
                ))}
              </RadioGroup>

              {/* Size Chart */}
              <Button
                variant="text"
                sx={{ textTransform: "none", marginBottom: "20px" }}
              >
                Size Chart
              </Button>

              <Divider sx={{ marginBottom: "20px" }} />

              {/* Quantity Selector */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "20px",
                }}
              >
                <Button variant="outlined" sx={{ minWidth: "40px" }}>
                  -
                </Button>
                <Typography variant="body1">1</Typography>
                <Button variant="outlined" sx={{ minWidth: "40px" }}>
                  +
                </Button>
              </Box>

              {/* Add to Cart Button */}
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#000",
                  textTransform: "none",
                  marginBottom: "10px",
                  width: "100%",
                  height: "50px",
                  "&:hover": {
                    background: "#003366",
                  },
                }}
              >
                Add to Cart
              </Button>

              {/* Add to Wishlist Button */}
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  textTransform: "none",
                  marginBottom: "20px",
                  width: "100%",
                  height: "50px",
                }}
                startIcon={<FavoriteBorderIcon />}
              >
                Add to Wishlist
              </Button>

              {/* Buy it Now Button */}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#000",
                  textTransform: "none",
                  width: "100%",
                  height: "50px",
                  "&:hover": {
                    background: "#003366",
                  },
                }}
              >
                Buy it Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Product;
