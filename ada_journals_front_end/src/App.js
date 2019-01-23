import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utilities/setAuthToken';
import { setCurrentUser } from './actions/authActions';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './components/layout/HomePage';
import Registration from './components/authorization/Registration';
import Login from './components/authorization/Login';

import './App.css';

// Checking for token
if(localStorage.jwtToken) {
  // header authorization token
  setAuthToken(localStorage.jwtToken);
  // decoded token for logged in user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // setting authenticated user
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={ HomePage } />
            <div className="container">
              <Route exact path="/registration" component={ Registration } />
              <Route exact path="/login" component={ Login } />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
