import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from "@mui/material";

const LaunchDetailsModal = ({ launch, onClose }) => {
  if (!launch) {
    return null;
  }
  const formattedDateTime = new Date(launch.date_utc).toLocaleString();

  return (
    <Dialog open={Boolean(launch)} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{launch.name}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          UNIX: {launch.date_unix ? launch.date_unix : "-"}
        </Typography>
        <Typography variant="body1">
          Flight Number: {launch.flight_number}
        </Typography>
        <Typography variant="body1">Date: {formattedDateTime}</Typography>
        <Typography variant="body1">
          Success: {launch.success ? "Yes" : "No"}
        </Typography>

        <Typography variant="body1">
          Details: {launch.details ? launch.details : "Details Not Found"}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LaunchDetailsModal;
