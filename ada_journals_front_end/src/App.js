import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './components/layout/HomePage';
import Registration from './components/authorization/Registration';
import Login from './components/authorization/Login';

import './App.css';

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
