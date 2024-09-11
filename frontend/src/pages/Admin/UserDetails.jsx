import React, { useEffect, useState } from "react";
import { Avatar, Button, Grid, Paper, TextField } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import AdminHeader from "../../component/AdminHeader";
import axios from "axios";

// Function to format date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

const UserDetails = () => {
  const [users, setUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get('http://localhost:3000/api/user');
        setUser(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchUsers();
  }, []);

  // Filter users based on the search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Grid container>
      <AdminHeader />
      <Grid item xs={12} sx={{ p: 2, m: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Grid>

      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#2c2c38", color: "#fff", p: 2, m: 2 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#000" }}>DATE CREATED</TableCell>
              <TableCell sx={{ color: "#000" }}>USER IMAGE</TableCell>
              <TableCell sx={{ color: "#000" }}>FIRST NAME</TableCell>
              <TableCell sx={{ color: "#000" }}>EMAIL</TableCell>
              <TableCell sx={{ color: "#000" }}>ADDRESS</TableCell>
              <TableCell sx={{ color: "#000" }}>DELETE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell sx={{ color: "#fff" }}>{formatDate(user.createdAt)}</TableCell>
                <TableCell>
                  <Avatar src={user.img || ""} />
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>{user.name}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{user.email}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{user.address || "N/A"}</TableCell>
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

export default UserDetails;
