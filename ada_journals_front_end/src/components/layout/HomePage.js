import React, { Component } from 'react';

class HomePage extends Component {
  render() {
    return (
      <div className="homepage">
        <div className="dark-overlay landing-inner text-dark">
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
                <a href="registration.html" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </a>
                <a href="login.html" className="btn btn-lg btn-warning">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage;
