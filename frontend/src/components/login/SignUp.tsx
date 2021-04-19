import React, { useState } from 'react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import {
  Typography,
  Container,
  Grid,
  TextField,
  Button,
} from '@material-ui/core';
import axios from 'axios';
import { useStyles } from './styles/styles';
import { setSession } from '../../session';
import { useHistory } from 'react-router';

interface OwnProps {
  boardingToggle: () => void;
}

type Props = OwnProps;

export const SignUp: React.FC<Props> = (props: Props) => {
  const { boardingToggle } = props;
  const classes = useStyles();
  const history = useHistory();
  const [password1, setPassWord1] = useState<string>('');
  const [password2, setPassWord2] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handlePasswordOne = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassWord1(event.target.value);
  };

  const handlePasswordTwo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassWord2(event.target.value);
  };

  const validate = () => {
    if (password1 !== password2) {
      setError('passwords not same');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (validate()) {
        const res = await axios.post('/api/user/register', {
          firstName,
          lastName,
          userName,
          password: password1,
        });

        setSession(res.data.token, res.data.expiry);
        history.push('/profile');
      }
    } catch (e) {
      console.log(e.message);
      setError('user name or passwords invalid');
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
            {error ? error : 'Welcome home, player'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='firstName'
              label='First Name'
              name='firstName'
              autoFocus
              value={firstName}
              onChange={handleFirstName}
              inputProps={{ className: classes.input }}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='lastName'
              label='Last Name'
              id='lastName'
              value={lastName}
              onChange={handleLastName}
              inputProps={{ className: classes.input }}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='userName'
              label='User Name'
              name='userName'
              autoFocus
              value={userName}
              onChange={handleUserName}
              inputProps={{ className: classes.input }}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='password1'
              label='Password'
              type='password'
              name='password1'
              autoFocus
              value={password1}
              onChange={handlePasswordOne}
              inputProps={{ className: classes.input }}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='password2'
              label='Re-enter Password'
              type='password'
              name='password2'
              autoFocus
              value={password2}
              onChange={handlePasswordTwo}
              inputProps={{ className: classes.input }}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}>
              Sign Up
            </Button>
            <Grid container justify='center'>
              <Grid item>
                <Typography
                  style={{ cursor: 'pointer' }}
                  onClick={boardingToggle}>
                  Already have an account? Login
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};
