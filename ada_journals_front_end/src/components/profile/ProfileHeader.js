import React, { Component } from 'react';
import isEmpty from '../../validation/isEmpty';


class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-black mb-3">
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center text-white">
                {isEmpty(profile.pronouns) ? null : (
                  <span>My Pronouns: {profile.pronouns}</span>
                )}
              </p>
              <p className="lead text-center text-white">
                {isEmpty(profile.hometown) ? null : (
                  <span>My Hometown: {profile.hometown}</span>
                )}
              </p>
              <p className="lead text-center text-white">
                {isEmpty(profile.interests) ? null : (
                  <span>My Interests: {profile.interests}</span>
                )}
              </p>
              <p className="lead text-center text-white">
                {isEmpty(profile.bio) ? null : (
                  <span>About Me: {profile.bio}</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileHeader;
