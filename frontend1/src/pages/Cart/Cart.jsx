import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import axios from "axios";
import Swal from "sweetalert2";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      const userId = localStorage.getItem("id"); // Retrieve user ID from local storage
      try {
        const response = await axios.get(
          `http://localhost:3000/api/cart/byuser/${userId}`
        );
        setCartItems(response.data.data);
        calculateTotalPrice(response.data.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        Swal.fire("Error", "Failed to fetch cart items", "error");
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = (cartId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
    calculateTotalPrice(
      cartItems.map((item) =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = async (cartId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#003366",
      cancelButtonText: "Cancel",
      cancelButtonColor: "#FF0000",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/cart/${cartId}`);
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.cartId !== cartId)
        );
        calculateTotalPrice(cartItems.filter((item) => item.cartId !== cartId));
        Swal.fire({
          title: "Success!",
          text: "The item has been removed from your cart!",
          confirmButtonText: "OK",
          confirmButtonColor: "#003366",
        });
      } catch (error) {
        console.error("Error removing item:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to remove item",
          confirmButtonText: "OK",
          confirmButtonColor: "#FF0000",
        });
      }
    }
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const handleUpdateCart = async () => {
    setLoading(true);
    try {
      await Promise.all(
        cartItems.map((item) =>
          axios.patch(`http://localhost:3000/api/cart/${item.cartId}`, {
            quantity: item.quantity,
          })
        )
      );
      Swal.fire({
        title: "Success!",
        text: "Cart updated successfully!",
        confirmButtonText: "OK",
        confirmButtonColor: "#003366",
      });
    } catch (error) {
      console.error("Error updating cart:", error);
      Swal.fire("Error", "Failed to update cart", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid sx={{ minHeight: "100vh" }}>
      <Box sx={{ maxWidth: 1200, margin: "auto", padding: 2 }}>
        <Typography variant="h4" my={4} ml={2}>
          My Cart
        </Typography>
        {cartItems.map((item) => (
          <Card
            key={item.cartId}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 2,
              marginBottom: 2,
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: 150,
                height: 150,
                objectFit: "cover",
                borderRadius: 1,
              }}
              image={item.thumbnailImage}
              alt={item.productName}
            />
            <Box sx={{ flex: 1, marginLeft: 2 }}>
              <CardContent>
                <Typography variant="h6">{item.productName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.color} / {item.size}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  Rs {item.price.toFixed(2)}
                </Typography>
              </CardContent>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                onClick={() =>
                  handleQuantityChange(item.cartId, item.quantity - 1)
                }
              >
                <Remove />
              </IconButton>
              <Typography>{item.quantity}</Typography>
              <IconButton
                onClick={() =>
                  handleQuantityChange(item.cartId, item.quantity + 1)
                }
              >
                <Add />
              </IconButton>
              <Button
                variant="text"
                color="error"
                onClick={() => handleRemoveItem(item.cartId)}
              >
                Remove
              </Button>
            </Box>
            <Typography sx={{ marginLeft: 2 }} variant="body1">
              Rs {(item.price * item.quantity).toFixed(2)}
            </Typography>
          </Card>
        ))}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <Typography variant="h5" ml={2}>
            Total: Rs {totalPrice.toFixed(2)}
          </Typography>
          <Box>
            <Button
              variant="outlined"
              sx={{ marginRight: 2, color: "#003366", borderColor: "#003366" }}
              onClick={handleUpdateCart}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Update"}
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
