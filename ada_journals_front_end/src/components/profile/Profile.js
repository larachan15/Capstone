import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProfileByUserProfile } from '../../actions/profileActions';
import ProfileHeader from './ProfileHeader';

class Profile extends Component {
  componentDidMount() {
    if(this.props.match.params.userProfile) {
      this.props.getProfileByUserProfile(this.props.match.params.userProfile)
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileInfo;

    if(profile === null || loading) {
      profileInfo = <h2>Loading...</h2>
    } else {
      profileInfo = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-md btn-outline-secondary mb-3">Back to Profiles</Link>
            </div>
          </div>
          <ProfileHeader profile={profile}/>
        </div>
      )
    }
    return(
      <div className="profile">
        <div className="row">
          <div className="col-md-12">
            {profileInfo}
          </div>
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByUserProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}


export default connect(mapStateToProps, { getProfileByUserProfile })(Profile);
