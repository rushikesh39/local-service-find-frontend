import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import {
  CalendarToday,
  CheckCircle,
  HourglassEmpty,
  ListAlt,
  BarChart,
} from "@mui/icons-material";
import { BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
const mockStats = [
  { title: "Total Bookings", value: 120, icon: <ListAlt /> },
  { title: "Pending Requests", value: 5, icon: <HourglassEmpty /> },
  { title: "Completed Jobs", value: 90, icon: <CheckCircle /> },
  { title: "Upcoming Services", value: 3, icon: <CalendarToday /> },
];

const mockChart = [
  { month: "Jan", bookings: 10 },
  { month: "Feb", bookings: 20 },
  { month: "Mar", bookings: 40 },
  { month: "Apr", bookings: 35 },
  { month: "May", bookings: 50 },
  { month: "Jun", bookings: 30 },
];

const StatusCards = () => {
  return (
    <div style={{ padding: "16px" }}>
      <Typography variant="h5" gutterBottom>
        Welcome back, Provider!
      </Typography>

      <Grid container spacing={2}>
        {mockStats.map(({ title, value, icon }, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="h6">{value}</Typography>
                <div style={{ float: "right", color: "#1976d2" }}>{icon}</div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Monthly Bookings" />
            <CardContent style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart data={mockChart}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#1976d2" />
                </ReBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Quick Actions" />
            <CardContent>
              <Button variant="contained" sx={{ mr: 1 }}>
                Add New Service
              </Button>
              <Button variant="outlined" sx={{ mr: 1 }}>
                Update Profile
              </Button>
              <Button variant="outlined">Check Messages</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default StatusCards;
