import { useState } from "react";
import { Box, Button, Card, CardContent } from "@mui/material";
import { IconButton, Typography, Grid, CardMedia } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <Grid sx={{ minHeight: "100vh" }}>
      <Box sx={{ maxWidth: 1200, margin: "auto", padding: 2 }}>
        <Typography variant="h4" my={4} ml={2}>
          My Cart
        </Typography>
        <Card sx={{ display: "flex", alignItems: "center", padding: 2 }}>
          <CardMedia
            component="img"
            sx={{
              width: 150,
              height: 150,
              objectFit: "cover",
              borderRadius: 1,
            }}
            image="https://via.placeholder.com/150"
            alt="Product Image"
          />
          <Box sx={{ flex: 1, marginLeft: 2 }}>
            <CardContent>
              <Typography variant="h6">SLOGAN OVERSIZE TEE - UNISEX</Typography>
              <Typography variant="body2" color="text.secondary">
                Jet Black / XL
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                LKR 3,850.00
              </Typography>
            </CardContent>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton onClick={handleDecrement}>
              <Remove />
            </IconButton>
            <Typography>{quantity}</Typography>
            <IconButton onClick={handleIncrement}>
              <Add />
            </IconButton>
            <Button variant="text" color="error">
              Remove
            </Button>
          </Box>
          <Typography sx={{ marginLeft: 2 }} variant="body1">
            LKR 3,850.00
          </Typography>
        </Card>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <Typography variant="h5" ml={2}>
            LKR 3,850.00
          </Typography>
          <Box>
            <Button
              variant="outlined"
              sx={{ marginRight: 2, color: "#003366", borderColor: "#003366" }}
            >
              Update
            </Button>
            <Button variant="contained" sx={{ background: "#003366" }}>
              Check out
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default Cart;
