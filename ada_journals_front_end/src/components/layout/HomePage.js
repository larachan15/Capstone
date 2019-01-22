import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  render() {
    return (
      <div className="homepage">
        <div className="dark-overlay homepage-inner text-dark">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4"> Ada Journals </h1>
                <h2>Capture and share your notes/ideas with fellow Adies!</h2>
                <hr />
                <p className="lead">
                  {' '}
                  A place to facilitate the organization of online learning by creating a more efficient process while promoting the ethical use of technology.
                </p>
                <hr />
                <Link to="/registration" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-warning">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage;
