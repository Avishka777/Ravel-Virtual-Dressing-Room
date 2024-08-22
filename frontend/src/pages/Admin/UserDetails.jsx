import React from "react";
import { Avatar, Button, Grid, Paper } from "@mui/material";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead, TableRow } from "@mui/material";
import AdminHeader from "../../component/AdminHeader";

const UserDetails = () => {
  const users = [
    {
      id: 1,
      date: "5/6/2024",
      name: "Eshan",
      username: "Eshan",
      email: "eshan@gmail.com",
      address: "Kaduruvela",
      img: "",
    },
    {
      id: 2,
      date: "4/4/2024",
      name: "Avizka",
      username: "avishkarathnakumara3145",
      email: "avishk.work@gmail.com",
      address: "Malabe",
      img: "",
    },
    {
      id: 3,
      date: "4/4/2024",
      name: "Avishka",
      username: "Avishka",
      email: "avishka@gmail.com",
      address: "Polonnaruwa",
      img: "",
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
              <TableCell sx={{ color: "#000" }}>USER IMAGE</TableCell>
              <TableCell sx={{ color: "#000" }}>FIRST NAME</TableCell>
              <TableCell sx={{ color: "#000" }}>USER NAME</TableCell>
              <TableCell sx={{ color: "#000" }}>EMAIL</TableCell>
              <TableCell sx={{ color: "#000" }}>ADDRESS</TableCell>
              <TableCell sx={{ color: "#000" }}>DELETE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell sx={{ color: "#fff" }}>{user.date}</TableCell>
                <TableCell>
                  <Avatar src={user.img} />
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>{user.name}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{user.username}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{user.email}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{user.address}</TableCell>
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
