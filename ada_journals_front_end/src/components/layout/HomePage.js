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
        <div className="container">
          <div className="row">
            <div className="card mt-5">
              <div className="card card-header bg-secondary text-black text-center mb-3">
                <h1 className="display-2 mt-4 mb-4"> Ada Journals </h1>
                <h2 className="text-white mt-4 mb-5">Capture and share your notes/ideas with fellow Adies!</h2>
              </div>
              <div className="card-body text-center mt-4 mb-4">
                <p className="lead mb-5 mr-3 ml-3">
                  A place to facilitate the organization of online learning by creating a more efficient process while promoting the ethical use of technology.
                </p>
                <hr />
                <Link to="/registration" className="btn btn-lg btn-dark mt-5 mr-3">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-warning mt-5">
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
