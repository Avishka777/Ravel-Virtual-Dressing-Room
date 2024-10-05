import { Grid } from "@mui/material";
import React from "react";
import AdminHeader from "../../component/AdminHeader";
import UserProgressChart from "../../component/UserProgressChart";

const MainDashboard = () => {
  return (
    <Grid>
      <AdminHeader />
      <Grid item xs={12}>
        <UserProgressChart/>
      </Grid>
      
    </Grid>
  );
};

export default MainDashboard;
