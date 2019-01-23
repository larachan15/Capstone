import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: '',
      bio: '',
      pronouns: '',
      hometown: '',
      interests: ''
    }
  }

  render() {
    // const { errors } = this.props;
    const { userProfile, bio, pronouns, hometown, interests } = this.state;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              { /* <p className="lead text-center">
                Add your info here!
              </p> */ }
              <small className="d-block pb-3">* a required field</small>
              <form>
                <div className="form-group">
                  <input
                    type="userProfile"
                    className="form-control form-control-lg"
                    placeholder="* User Name"
                    name="userProfile"
                    value={userProfile}
                    info="A username for your profile URL."
                  />
                </div>
                <div className="form-group">
                  <textarea
                    type="bio"
                    className="form-control form-control-lg"
                    placeholder="Bio"
                    name="bio"
                    value={bio}
                    info="Tell us a little about yourself"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="pronouns"
                    className="form-control form-control-lg"
                    placeholder="Pronouns"
                    name="pronouns"
                    value={pronouns}
                    info="What are your preferred pronouns?"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="hometown"
                    className="form-control form-control-lg"
                    placeholder="Hometown"
                    name="hometown"
                    value={hometown}
                    info="Where are you from?"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    type="interests"
                    className="form-control form-control-lg"
                    placeholder="Interests"
                    name="interests"
                    value={interests}
                    info="What do you like to do?"
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    errors: state.errors
  }
}

export default connect(mapStateToProps)(CreateProfile);
