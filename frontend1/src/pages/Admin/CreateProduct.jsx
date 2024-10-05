import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup, FormControl, FormLabel } from "@mui/material";  // Add FormGroup here
import axios from "axios";
import Swal from "sweetalert2";
import AdminHeader from "../../component/AdminHeader";
import Footer from "../../component/Footer";

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    color: [],
    size: [],
    category: "", // Category is now a string
    price: "",
    thumbnailImage: "",
    image: "",
    name: "",
    description: "",
    stock: "",
    isActive: true,
  });

  const sizeOptions = ["XS", "S", "M", "L", "XXL"];
  const colorOptions = ["White", "Gray", "Black", "Red", "Blue"];
  const categoryOptions = ["Men", "Women"]; // Options for category

  const handleCheckboxChange = (e, category) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedArray = checked
        ? [...prevData[category], value]
        : prevData[category].filter((item) => item !== value);

      return {
        ...prevData,
        [category]: updatedArray,
      };
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCategoryChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      category: e.target.value, // Set category to selected value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      image: formData.image.split(",").map((img) => img.trim()),
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/product",
        productData
      );
      Swal.fire({
        title: "Success!",
        text: "Create Product Successfully!",
        confirmButtonText: "OK",
        confirmButtonColor: "#003366",
      });
      console.log("Product created:", response.data);
    } catch (error) {
      console.error("Error creating product:", error);
      Swal.fire({
        title: "Error!",
        text: error?.response?.data?.message || "Error Creating Product.",
        confirmButtonText: "OK",
        confirmButtonColor: "#FF0000",
      });
    }
  };

  return (
    <Grid>
      <AdminHeader />
      <form onSubmit={handleSubmit}>
        <Grid
          justifyContent="center"
          sx={{ maxWidth: "1000px", margin: "auto", minHeight: "100vh", mt: 5 }}
        >
          <Grid item xs={12}>
            <Typography variant="h3" align="center" mb={4}>
              Create New Product
            </Typography>
          </Grid>
          <Grid container spacing={4}>
            <Grid item md={6}>
              <Typography variant="h6">Enter Product Name :</Typography>
              <TextField
                fullWidth
                placeholder="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Typography variant="h6" mt={2}>
                Enter Product Price :
              </Typography>
              <TextField
                fullWidth
                placeholder="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
              />
              <Typography variant="h6" mt={2}>
                Enter Product Stock Quantity :
              </Typography>
              <TextField
                fullWidth
                placeholder="Stock Quantity"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                required
              />
              <Typography variant="h6" mt={2}>
                Enter Product Description :
              </Typography>
              <TextField
                fullWidth
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                multiline
                rows={4}
              />
            </Grid>
            <Grid item md={6}>
              <Typography variant="h6">Enter Main Image URL :</Typography>
              <TextField
                fullWidth
                placeholder="Thumbnail Image URL"
                name="thumbnailImage"
                value={formData.thumbnailImage}
                onChange={handleChange}
                required
              />
              <Typography variant="h6" mt={2}>
                Enter Other Image URLs :
              </Typography>
              <TextField
                fullWidth
                placeholder="Image URLs (comma separated)"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />

              <Typography variant="h6" mt={2}>
                Select Colors :
              </Typography>
              <FormGroup row>
                {colorOptions.map((color) => (
                  <FormControlLabel
                    key={color}
                    control={
                      <Checkbox
                        value={color}
                        checked={formData.color.includes(color)}
                        onChange={(e) => handleCheckboxChange(e, "color")}
                      />
                    }
                    label={color}
                  />
                ))}
              </FormGroup>

              <Typography variant="h6" mt={2}>
                Select Sizes :
              </Typography>
              <FormGroup row>
                {sizeOptions.map((size) => (
                  <FormControlLabel
                    key={size}
                    control={
                      <Checkbox
                        value={size}
                        checked={formData.size.includes(size)}
                        onChange={(e) => handleCheckboxChange(e, "size")}
                      />
                    }
                    label={size}
                  />
                ))}
              </FormGroup>

              <Typography variant="h6" mt={2}>
                Select Category :
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="category"
                  name="category"
                  value={formData.category}
                  onChange={handleCategoryChange}
                >
                  {categoryOptions.map((category) => (
                    <FormControlLabel
                      key={category}
                      value={category}
                      control={<Radio />}
                      label={category}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <Typography variant="h6" mt={2}>
                Available Stock :
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                  />
                }
                label="Is Available"
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{
              backgroundColor: "#003366",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#003388",
              },
              height: 40,
              mt: 4,
            }}
          >
            Create Product
          </Button>
        </Grid>
      </form>
      <Footer />
    </Grid>
  );
}
