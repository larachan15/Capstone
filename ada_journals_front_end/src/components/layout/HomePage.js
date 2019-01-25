import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class HomePage extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className="homepage">
        <div className="dark-overlay homepage-inner text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center text-muted">
                <h1 className="display-3 mb-4"> Ada Journals </h1>
                <h2 className="text-muted">Capture and share your notes/ideas with fellow Adies!</h2>
                <hr />
                <p className="lead">
                  A place to facilitate the organization of online learning by creating a more efficient process while promoting the ethical use of technology.
                </p>
                <hr />
                <Link to="/registration" className="btn btn-lg btn-outline-secondary mr-2">
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

HomePage.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(HomePage);
