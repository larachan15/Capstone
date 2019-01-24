import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/isEmpty';

class EachProfile extends Component {
  render() {
    const { profile } = this.props;

    return(
      <div className="card card-body bg-lg mb-3">
        <div className="row">
          <div className="col-lg-6 col-md-4 col-8">
            <h4>{profile.user.name}</h4>
            <p> {isEmpty(profile.bio) ? null : <span>{profile.bio}</span>}</p>
            <Link to={`/profile/${profile.userProfile}`} className="btn btn-dark">View Profile</Link>
          </div>
        </div>
      </div>
    )
  }
}

EachProfile.propTypes = {
  profile: PropTypes.object.isRequired
};

export default EachProfile;
