import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profileActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardInfo;
    if(profile === null || loading) {
      dashboardInfo = <h3>Loading...</h3>
    } else {
      if(Object.keys(profile).length > 0) {
        dashboardInfo = <h3>Display Profile</h3>
      } else {
        dashboardInfo = (
          <div>
            <p className="lead text-musted">Hi { user.name }! </p>
            <p>You don't have a profile yet, so let's set one up for you.</p>
            <Link to="/create-profile" className="btn btn-lg btn-outline-secondary">Create Profile</Link>
          </div>
        )
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Welcome to the Dashboard!</h1>
              {dashboardInfo}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    auth: state.auth
  }
}

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
