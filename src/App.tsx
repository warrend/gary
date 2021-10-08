import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  RouteProps,
} from 'react-router-dom';
import { LoginPage, SignupPage } from './pages/authentication';
import AuthContextProvider, { useAuth } from './contexts/auth-context';
import { Home } from './pages/dashboard';

function App(): JSX.Element {
  const auth = useAuth();

  // function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
  //   setInput(e.target.value);
  // }

  function PrivateRoute({ component: Component, ...rest }: any) {
    return (
      <Route
        {...rest}
        render={(props: RouteProps) => {
          return auth?.currentUser ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          );
        }}
      ></Route>
    );
  }

  return (
    <div className="App">
      <AuthContextProvider>
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
          </Switch>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
