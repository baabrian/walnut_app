import React, { useState } from 'react';
import { Login } from '../../components/login/Login';
import { SignUp } from '../../components/login/SignUp';
import { Grid } from '@material-ui/core';

export const Onboarding: React.FC = () => {
  const [signUp, setSignUp] = useState<boolean>(true);

  const handleToggleOnboarding = () => {
    setSignUp(!signUp);
  };

  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      style={{ height: '100vh', width: '100vw' }}>
      {signUp ? (
        <SignUp boardingToggle={handleToggleOnboarding} />
      ) : (
        <Login boardingToggle={handleToggleOnboarding} />
      )}
    </Grid>
  );
};
