import React from "react";
import { Button, Grid, Paper } from "@mui/material";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead, TableRow } from "@mui/material";
import AdminHeader from "../../component/AdminHeader";

const ClothingDetails = () => {
  const users = [
    {
      id: 1,
      date: "5/6/2024",
      code: "C001",
      category: "Shirt",
      price: "Rs. 2000.00",
      address: "Kaduruvela",
    },
    {
      id: 2,
      date: "4/4/2024",
      code: "C002",
      category: "Shirt",
      price: "Rs. 2300.00",
      address: "Malabe",
    },
    {
      id: 3,
      date: "4/4/2024",
      code: "C003",
      category: "T-Shirt",
      price: "Rs. 3000.00",
      address: "Polonnaruwa",
    },
  ];

  return (
    <Grid container>
      <AdminHeader />
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#2c2c38", color: "#fff", p: 2, m: 2 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#000" }}>DATE CREATED</TableCell>
              <TableCell sx={{ color: "#000" }}>ITEM CODE</TableCell>
              <TableCell sx={{ color: "#000" }}>ITEM CATEGORY</TableCell>
              <TableCell sx={{ color: "#000" }}>PRICE</TableCell>
              <TableCell sx={{ color: "#000" }}>UPDATE</TableCell>
              <TableCell sx={{ color: "#000" }}>DELETE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell sx={{ color: "#fff" }}>{user.date}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{user.code}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{user.category}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{user.price}</TableCell>
                <TableCell>
                  <Button color="success">Update</Button>
                </TableCell>
                <TableCell>
                  <Button color="error">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default ClothingDetails;
