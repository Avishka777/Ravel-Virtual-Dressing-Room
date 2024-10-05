import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Paper, Table, TableBody } from "@mui/material";
import { TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import AdminHeader from "../../component/AdminHeader";
import Footer from "../../component/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import for table creation in PDF

const ClothingDetails = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/product");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
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
        await axios.delete(`http://localhost:3000/api/product/${productId}`);
        setProducts(products.filter((product) => product._id !== productId));
        Swal.fire("Deleted!", "The product has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting product:", error);
        Swal.fire(
          "Error!",
          "There was an error deleting the product.",
          "error"
        );
      }
    }
  };

  const handleUpdate = (productId) => {
    navigate(`/admin/clothing/update/${productId}`);
  };

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Set the title of the PDF
    doc.text("Clothing Details", 20, 10);

    // Convert table data to a format that jsPDF AutoTable can use
    const tableColumn = [
      "NAME",
      "IS AVAILABLE",
      "CREATED AT",
      "STOCK",
      "PRICE",
    ];
    const tableRows = [];

    products.forEach((product) => {
      const productData = [
        product.name,
        product.isActive ? "Yes" : "No",
        new Date(product.createdAt).toLocaleDateString(),
        product.stock,
        `Rs.${product.price}.00`,
      ];
      tableRows.push(productData);
    });

    // Add table to PDF
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("clothing-details.pdf"); // Download the PDF
  };

  return (
    <Grid>
      <AdminHeader />
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={generatePDF}
          sx={{ m: 2 }}
        >
          Download PDF
        </Button>
      </Box>
      <Box px={2}>
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "#2c2c38",
            color: "#fff",
            p: 2,
            mb:2,
            minHeight: "100vh",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#000" }}>NAME</TableCell>
                <TableCell sx={{ color: "#000" }}>IS AVAILABLE</TableCell>
                <TableCell sx={{ color: "#000" }}>CREATED AT</TableCell>
                <TableCell sx={{ color: "#000" }}>STOCK</TableCell>
                <TableCell sx={{ color: "#000" }}>PRICE</TableCell>
                <TableCell sx={{ color: "#000" }}>UPDATE</TableCell>
                <TableCell sx={{ color: "#000" }}>DELETE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell sx={{ color: "#fff" }}>{product.name}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {product.isActive ? "Yes" : "No"}
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {new Date(product.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>{product.stock}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    Rs.{product.price}.00
                  </TableCell>
                  <TableCell>
                    <Button
                      color="success"
                      onClick={() => handleUpdate(product._id)}
                    >
                      Update
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      color="error"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Footer />
    </Grid>
  );
};

export default ClothingDetails;
