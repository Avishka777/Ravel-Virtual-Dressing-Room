import ClothingCard from "./ClothingCard";
import {
  Grid,
  TextField,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AllClothing() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  // Fetch products with category and search term
  useEffect(() => {
    const fetchProducts = async () => {
      console.log("Starting to fetch products...");

      try {
        const params = {};
        if (searchTerm) {
          params.name = searchTerm;
        }
        if (category !== "All") {
          params.category = category;
        }

        const response = await axios.get(`http://localhost:3000/api/product`, {
          params,
        });
        console.log("Response received:", response);

        if (Array.isArray(response.data.data)) {
          console.log("Setting products state with:", response.data.data);
          setProducts(response.data.data);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        Swal.fire("Error", "Failed to fetch products", "error");
      }
    };

    fetchProducts();
  }, [searchTerm, category]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <Box>
      {/* Search Bar */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Box sx={{ display: "flex" }}>
          <Typography
            variant="h4"
            sx={{ marginTop: "10px", marginRight: "20px", color: "#003366" }}
          >
            Search Items
          </Typography>
          <TextField
            label="Search Products"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ width: "300px" }}
          />
        </Box>
        {/* Category Filter */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <RadioGroup
            row
            value={category}
            onChange={handleCategoryChange}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <FormControlLabel value="All" control={<Radio />} label="All" />
            <FormControlLabel value="Men" control={<Radio />} label="Men" />
            <FormControlLabel value="Women" control={<Radio />} label="Women" />
          </RadioGroup>
        </Box>
      </Box>

      {/* Product Grid */}
      <Grid
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <ClothingCard
              key={product._id}
              thumbnailImage={product.thumbnailImage}
              itemName={product.name}
              itemPrice={`LKR ${product.price}`}
              images={product.image}
              productId={product._id}
            />
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
            No products to display
          </Typography>
        )}
      </Grid>
    </Box>
  );
}
