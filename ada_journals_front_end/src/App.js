import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './components/layout/HomePage';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <HomePage />
        <Footer />
      </div>
    );
  }
}

export default App;
