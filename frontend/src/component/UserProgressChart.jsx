import React, { useEffect, useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { Paper, Typography, Button, Grid } from "@mui/material";
import axios from "axios";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const UserProgressChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "User Registrations",
        data: [],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  });

  const chartRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user");
        const userData = response.data.data;

        const monthlyData = Array(12).fill(0); // Initialize an array with 12 zeros

        userData.forEach((user) => {
          const month = new Date(user.createdAt).getMonth();
          monthlyData[month] += 1; // Increment the count for the specific month
        });

        setChartData({
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "User Registrations",
              data: monthlyData,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const generatePDF = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        
        pdf.setFontSize(16);
        pdf.text("User Progress Report", 20, 20);

        pdf.addImage(imgData, "PNG", 20, 30, 160, 90);

        pdf.setFontSize(12);
        pdf.text("Monthly Progress (% Change):", 20, 130);

        const monthlyData = chartData.datasets[0].data;
        let previousMonthData = 0;

        monthlyData.forEach((currentMonthData, index) => {
          if (index === 0) {
            // Skip percentage for the first month (no previous data to compare)
            return;
          }
          const percentageChange = ((currentMonthData - previousMonthData) / previousMonthData) * 100;
          pdf.text(
            `${chartData.labels[index]}: ${percentageChange.toFixed(2)}%`,
            20,
            140 + (index - 1) * 10
          );
          previousMonthData = currentMonthData;
        });

        pdf.save("user_progress_report.pdf");
      });
    }
  };

  return (
    <Grid container spacing={2}>
        <Grid item xs={12 } textAlign="end" >
        <Button variant="contained" color="primary" onClick={generatePDF}>
          Download PDF
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, m: 2, backgroundColor: "#2c2c38", color: "#fff" }}>
          <Typography variant="h6" align="center" gutterBottom>
            User Progress (Monthly Registrations)
          </Typography>
          {chartData.labels.length > 0 && (
            <div ref={chartRef}>
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                      position: "top",
                      labels: { color: "#fff" },
                    },
                    title: {
                      display: true,
                      text: "User Registrations per Month",
                      color: "#fff",
                    },
                  },
                  scales: {
                    x: {
                      ticks: { color: "#fff" },
                    },
                    y: {
                      ticks: { color: "#fff" },
                    },
                  },
                }}
              />
            </div>
          )}
        </Paper>
      </Grid>
      
    </Grid>
  );
};

export default UserProgressChart;
