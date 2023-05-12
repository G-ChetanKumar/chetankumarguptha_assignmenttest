import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';

const LaunchList = ({ launches, onLaunchClick }) => {
  return (
    <List>
      {launches.map((launch) => (
        <React.Fragment key={launch.id}>
          <ListItem button onClick={() => onLaunchClick(launch)}>
            <ListItemText primary={launch.name} secondary={`Flight Number: ${launch.flight_number}`} />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default LaunchList;
