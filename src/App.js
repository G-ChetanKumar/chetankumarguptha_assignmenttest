import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  ButtonGroup,
  Button
} from "@mui/material";
import LaunchList from "./LaunchList";
import LaunchDetailsModal from "./LaunchDetailsModal";

const App = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Fetch SpaceX launches data
    const fetchLaunches = async () => {
      try {
        const response = await fetch("https://api.spacexdata.com/v4/launches");
        const data = await response.json();
        setLaunches(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching launches:", error);
      }
    };
    fetchLaunches();
  }, []);

  const handleLaunchClick = (launch) => {
    setSelectedLaunch(launch);
  };

  const handleModalClose = () => {
    setSelectedLaunch(null);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredLaunches = launches.filter((launch) => {
    if (filter === "upcoming") {
      return launch.upcoming;
    } else if (filter === "past") {
      return !launch.upcoming;
    } else if (filter === "success") {
      return launch.success;
    } else if (filter === "failure") {
      return !launch.success;
    }
    return true; // 'all' filter
  });

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" align="center" mt={3} mb={2}>
        SpaceX Launches
      </Typography>
      <ButtonGroup variant="outlined" color="primary" aria-label="Filter">
        <Button
          onClick={() => handleFilterChange("all")}
          disabled={filter === "all"}
        >
          All
        </Button>
        <Button
          onClick={() => handleFilterChange("upcoming")}
          disabled={filter === "upcoming"}
        >
          Upcoming
        </Button>
        <Button
          onClick={() => handleFilterChange("past")}
          disabled={filter === "past"}
        >
          Past
        </Button>
        <Button
          onClick={() => handleFilterChange("success")}
          disabled={filter === "success"}
        >
          Success
        </Button>
        <Button
          onClick={() => handleFilterChange("failure")}
          disabled={filter === "failure"}
        >
          Failure
        </Button>
      </ButtonGroup>
      <LaunchList
        launches={filteredLaunches}
        onLaunchClick={handleLaunchClick}
      />
      <LaunchDetailsModal launch={selectedLaunch} onClose={handleModalClose} />
    </Container>
  );
};

export default App;
