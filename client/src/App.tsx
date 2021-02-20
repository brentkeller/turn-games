import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import { loadUser, IUser, saveUser, UserContext } from './components/auth/userContext';
import { AppShell } from './components/common/AppShell';
import { Home } from './pages/Home';

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = React.useState(loadUser());

  const updateUser = (user?: IUser) => {
    saveUser(user);
    setUser(user);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <UserContext.Provider value={{ updateUser, user }}>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <AppShell>
                <Home />
              </AppShell>
            </Route>
            {/* <PrivateRoute path="/">
            <AppShell>Home</AppShell>
          </PrivateRoute> */}
          </Switch>
        </UserContext.Provider>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
