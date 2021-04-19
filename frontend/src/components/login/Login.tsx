import React, { useState } from 'react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import {
  Typography,
  Container,
  Grid,
  TextField,
  Button,
} from '@material-ui/core';
import { useStyles } from './styles/styles';
import axios from 'axios';
import { setSession } from '../../session';
import { useHistory } from 'react-router';

interface OwnProps {
  boardingToggle: () => void;
}

type Props = OwnProps;

export const Login: React.FC<Props> = (props: Props) => {
  const { boardingToggle } = props;
  const classes = useStyles();
  const history = useHistory();
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const validate = () => {
    if (!userName && !password) {
      setError('Error');
      return false;
    } else {
      setError('');
      return true;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (validate()) {
        const res = await axios.get('/api/user/login', {
          params: {
            userName,
            password,
          },
        });

        setSession(res.data.token, res.data.expiry);
        history.push('/profile');
      }
    } catch (e) {
      console.log(e.message);
      setError('User name or password invalid');
    }
  };

  return (
    <Container maxWidth='xs'>
      <Grid
        container
        direction='column'
        justify='center'
        alignItems='center'
        className={classes.container}>
        <Grid
          container
          justify='center'
          alignItems='center'
          className={classes.smileIconContainer}>
          <InsertEmoticonIcon className={classes.smileIcon} />
        </Grid>
        <Grid container justify='center' className={classes.form}>
          <Typography variant='h5'>
            {!error ? 'Welcome home, player' : error}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='userName'
              label='User Name'
              name='userName'
              value={userName}
              onChange={handleUserName}
              autoFocus
              inputProps={{ className: classes.input }}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              value={password}
              onChange={handlePassword}
              inputProps={{ className: classes.input }}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}>
              Login
            </Button>
            <Grid container justify='center'>
              <Grid item>
                <Typography
                  style={{ cursor: 'pointer' }}
                  onClick={boardingToggle}>
                  Don't have an account? SignUp
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};
