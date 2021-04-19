import React from 'react';
import {
  Grid,
  Card,
  CardActions,
  Button,
  Typography,
  CardContent,
} from '@material-ui/core';
import { clearSession } from '../../session';
import { useHistory } from 'react-router';

export const Profile = () => {
  const history = useHistory();

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    clearSession();
    history.push('/');
  };

  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      style={{ height: '100vh', width: '100vw' }}>
      <Card>
        <CardContent>
          <Typography variant='h3'>Welcome to profile</Typography>
        </CardContent>
        <CardActions>
          <Grid container justify='center'>
            <Button
              fullWidth
              color='secondary'
              variant='contained'
              onClick={handleLogout}>
              Sign out
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};
