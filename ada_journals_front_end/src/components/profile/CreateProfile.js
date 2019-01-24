import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profileActions';
import classnames from 'classnames';

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

  onChange = (event) => {
    // console.log("Some stuff was typed in the profile form!");

    const field = event.target.name;
    const value = event.target.value;

    const newState = {};
    newState[field] = value;
    // this.setState({ [field]: value });
    this.setState(newState);
    console.log(newState);
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    const newProfile = {
      userProfile: this.state.userProfile,
      bio: this.state.bio,
      pronouns: this.state.pronouns,
      hometown: this.state.hometown,
      interests: this.state.interests
    };

    this.props.createProfile(newProfile, this.props.history);
    // console.log(newProfile);
  }

  render() {
    const { errors } = this.props;
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
              <form onSubmit={this.onFormSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", { "is-invalid" : errors.userProfile })}
                    placeholder="* User Profile"
                    name="userProfile"
                    value={userProfile}
                    onChange={this.onChange}
                  />
                  {errors.userProfile && (<div className="invalid-feedback">{errors.userProfile}</div>)}
                  <small className="d-block">A username for your profile URL.</small>
                </div>
                <div className="form-group">
                  <textarea
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Bio"
                    name="bio"
                    value={bio}
                    onChange={this.onChange}
                  />
                  <small className="d-block">Tell us a little about yourself.</small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Pronouns"
                    name="pronouns"
                    value={pronouns}
                    onChange={this.onChange}
                  />
                  <small className="d-block">What are your preferred pronouns?</small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Hometown"
                    name="hometown"
                    value={hometown}
                    onChange={this.onChange}
                  />
                  <small className="d-block">Where are you from?</small>
                </div>
                <div className="form-group">
                  <textarea
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Interests"
                    name="interests"
                    value={interests}
                    onChange={this.onChange}
                  />
                  <small className="d-block">What do you like to do?</small>
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

export default connect(mapStateToProps, { createProfile } )(withRouter(CreateProfile));
