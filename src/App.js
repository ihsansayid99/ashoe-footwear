import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'

import Navbar from './components/Navbar';
import Home from './Pages/Home'
import Login from './Pages/Login'
import Regist from './Pages/Regist'
import ProductDetail from './Pages/ProductDetail'
import Mens from './components/Mens'
import Profile from './Pages/Profile'
import PrivateRoute from './components/PrivateRoute'

if (localStorage.jwtToken) {
  //set auth to header auth
  const token = localStorage.jwtToken
  setAuthToken(token)
  //decode token and get user info and exp
  const decoded = jwt_decode(token)
  //set user and is authenticated
  store.dispatch(setCurrentUser(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (

    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route
          path="/mens"
          render={({ match: { url } }) => (
            <>
              <Route path={`${url}/`} component={Mens} exact />
              <Route path={`${url}/detail/:id`} component={ProductDetail} />
            </>
          )}
        />
        <Route path="/login" component={Login} />
        <Switch>
          <PrivateRoute exact path="/profile" component={Profile} />
        </Switch>
        <Route path="/registration" component={Regist} />
      </Router>
    </Provider>

  );
}

export default App;
