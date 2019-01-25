import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteMyAccount } from '../../actions/profileActions';
import ProfileButtons from './ProfileButtons';


class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(event) {
    this.props.deleteMyAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardInfo;
    if(profile === null || loading) {
      dashboardInfo = <h2>Loading...</h2>
    } else {
      if(Object.keys(profile).length > 0) {
        dashboardInfo = (
          <div>
            <h3 className="display-5 text-muted mt-4">Hello, { user.name }! </h3>
              <div className="btn-group mt-4 mr-3 btn-block">
              <ProfileButtons />
                <div>
                  <Link to={`/profile/${profile.userProfile}`} className="btn btn-dark btn-group mt-4 mr-3 btn-block">
                    <i className="fas fa-eye" /> View Your Profile
                  </Link>

                </div>
                <button
                   className="btn btn-danger mt-4 ml-3 mr-3"
                   onClick={this.onDeleteClick.bind(this)}>Delete Your Account</button>
              </div>
          </div>
        )
      } else {
        dashboardInfo = (
          <div>
            <p className="lead text-muted">Hello, { user.name }. </p>
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
              <h1 className="display-4">Your Dashboard</h1>
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
  deleteMyAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    auth: state.auth
  }
}

export default connect(mapStateToProps, { getCurrentProfile, deleteMyAccount })(Dashboard);
