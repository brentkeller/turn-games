import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import { loadUser, IUser, saveUser, UserContext } from './components/auth/userContext';
import { AppShell } from './components/common/AppShell';

function App() {
  const [user, setUser] = React.useState(loadUser());

  const updateUser = (user?: IUser) => {
    saveUser(user);
    setUser(user);
  };

  return (
    <Router>
      <UserContext.Provider value={{ updateUser, user }}>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/">
            <AppShell>Home</AppShell>
          </PrivateRoute>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
