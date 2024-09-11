import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Radio, FormControlLabel, Divider, Box } from "@mui/material";
import { Grid, Typography, Button, RadioGroup } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import Swal from "sweetalert2";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(""); // State for the selected image

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/product/${productId}`
        );
        setProduct(response.data.data);
        setSelectedSize(response.data.data.size[0]);
        setSelectedColor(response.data.data.color[0]);
        setSelectedImage(response.data.data.thumbnailImage); // Set the main image
      } catch (error) {
        console.error("Error fetching product:", error);
        Swal.fire("Error", "Failed to fetch product details", "error");
      }
    };

    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (increment) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + increment));
  };

  const handleAddToCart = async () => {
    const userId = localStorage.getItem("id");
    let response
    try {
      response = await axios.post("http://localhost:3000/api/cart", {
        userId: userId,
        productId: productId,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor,
        price: product.price,
      });

      console.log(response.data);
      
      
      Swal.fire({
        title: "Success!",
        text: response.data.message,
        confirmButtonText: "OK",
        confirmButtonColor: "#003366",
      });
      
    } catch (error) {
      console.error("Error adding product to cart:", error);
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        confirmButtonText: "OK",
        confirmButtonColor: "#FF0000",
      });
    }
  };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid>
      <Box sx={{ padding: "40px" }}>
        <Grid container spacing={4}>
          {/* Product Images Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box>
              <img
                src={selectedImage}
                alt={product.name}
                style={{ height: "30rem", borderRadius: "10px" }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              {product.image.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} - ${index + 1}`}
                  style={{
                    height: "8rem",
                    width: "auto",
                    borderRadius: "10px",
                    cursor: "pointer",
                    border: img === selectedImage ? "2px solid #000" : "none",
                  }}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </Box>
          </Grid>

          {/* Product Details Section */}
          <Grid item xs={12} md={5}>
            <Box sx={{ textAlign: "left" }}>
              {/* Breadcrumb */}
              <Typography variant="body2" sx={{ marginBottom: "10px" }}>
                Home / {product.name}
              </Typography>

              {/* Product Title */}
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {product.name}
              </Typography>

              {/* Price */}
              <Typography
                variant="h5"
                sx={{ margin: "20px 0", fontWeight: "bold" }}
              >
                Rs {product.price.toFixed(2)}
              </Typography>

              {/* Color Options */}
              <Typography
                variant="body2"
                sx={{ marginBottom: "5px", fontWeight: "bold" }}
              >
                COLOR
              </Typography>
              <Box sx={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                {product.color.map((color) => (
                  <Box
                    key={color}
                    sx={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: color.toLowerCase(),
                      border: "2px solid #000",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </Box>

              {/* Size Options */}
              <Typography
                variant="body2"
                sx={{ marginBottom: "5px", fontWeight: "bold" }}
              >
                SIZE
              </Typography>
              <RadioGroup
                row
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                sx={{ marginBottom: "20px" }}
              >
                {product.size.map((size) => (
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
                <Button
                  variant="outlined"
                  sx={{ minWidth: "40px" }}
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </Button>
                <Typography variant="body1">{quantity}</Typography>
                <Button
                  variant="outlined"
                  sx={{ minWidth: "40px" }}
                  onClick={() => handleQuantityChange(1)}
                >
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
                onClick={handleAddToCart}
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
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Product;
