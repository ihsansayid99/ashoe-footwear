import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import reactGa from 'react-ga';

import Navbar from './components/Navbar';
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import Regist from './Pages/Regist'
import ProductDetail from './Pages/ProductDetail'
import Mens from './components/Mens'
import Bershka from './components/Bershka'
import Sweater from './components/Sweater'
import LongOuter from './components/LongOuter'
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
  useEffect(() => {
    reactGa.initialize('UA-171589455-1')
    //to report page view
    reactGa.pageview(window.location.pathname + window.location.search)
  }, []);
  return (

    <Provider store={store}>
      <Router>

        <Navbar />
        <Route exact path="/" component={Home} />

        <Route
          path="/cardigan"
          render={({ match: { url } }) => (
            <>
              <Route path={`${url}/`} component={Mens} exact />
              <Route path={`${url}/detail/:slug`} component={ProductDetail} />
            </>
          )}
        />
        <Route path="/bershka"
          render={({ match: { url } }) => (
            <>
              <Route path={`${url}/`} component={Bershka} exact />
              <Route path={`${url}/detail/:slug`} component={ProductDetail} />
            </>
          )}
        />
        <Route path="/sweater"
          render={({ match: { url } }) => (
            <>
              <Route path={`${url}/`} component={Sweater} exact />
              <Route path={`${url}/detail/:slug`} component={ProductDetail} />
            </>
          )}
        />
        <Route path="/long-outer"
          render={({ match: { url } }) => (
            <>
              <Route path={`${url}/`} component={LongOuter} exact />
              <Route path={`${url}/detail/:slug`} component={ProductDetail} />
            </>
          )}
        />
        <Route path="/login" component={Login} />
        <Switch>
          <PrivateRoute exact path="/profile" component={Profile} />
        </Switch>
        <Route path="/registration" component={Regist} />
        <Route path="/cart" component={Cart} />
      </Router>
    </Provider>

  );
}

export default App;
