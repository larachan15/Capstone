import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions'

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      errors: {}
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onChange = (event) => {
    console.log("Some stuff was typed in the form!");

    const field = event.target.name;
    const value = event.target.value;

    const newState = {};
    newState[field] = value;
    this.setState(newState);
    console.log(newState);
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    this.setState({
      name: '',
      email: '',
      password: ''
    })

    this.props.registerUser(newUser, this.props.history);
    // console.log(newUser);
    // axios.post('/api/users/registration', newUser)
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((errors) => {
    //     // console.log(error.response.data);
    //     this.setState({errors: errors.response.data});
    //   })
  }

  render() {
    const { errors } = this.state;
    console.log(errors);

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up </h1>
              <p className="lead text-center">
                Create your account here:
              </p>
              <form onSubmit={this.onFormSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", { "is-invalid" : errors.name })}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", { "is-invalid" : errors.email })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", { "is-invalid" : errors.email })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Registration.propTypes = {
  // This is an action but also a property
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

// getting state into our component
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors
  }
}

export default connect(mapStateToProps, { registerUser })(withRouter(Registration));
