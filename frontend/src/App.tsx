import React from 'react';
import { Onboarding } from './views/onboarding/Onboarding';
import { Profile } from './views/profile/Profile';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { ProtectedRoute } from './components/protected-route/ProtectedRoute';

enum ROUTES {
  ONBOARDING = '/',
  PROFILE = '/profile',
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTES.ONBOARDING} component={Onboarding} />
        <ProtectedRoute exact path={ROUTES.PROFILE} component={Profile} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
