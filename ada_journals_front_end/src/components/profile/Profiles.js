import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/profileActions';
import EachProfile from './EachProfile';

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let eachProfile;

    if(profiles === null || loading) {
      eachProfile = <h3>Loading profiles...</h3>
    } else {
      if(profiles.length > 0) {
        eachProfile = profiles.map(profile => (
          <EachProfile
            key={profile._id}
            profile={profile}
          />
        ))
      } else {
        eachProfile = <h3>Sorry, no profiles to show. </h3>
      }
    }

    return(
    <div className="profiles">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Ada Profiles</h1>
            <p className="lead text-center">
              Connect with fellow Adies!
            </p>
            {eachProfile}
          </div>
        </div>
      </div>
    </div>
    )
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps, { getProfiles })(Profiles);
