import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  onChange = (event) => {
    console.log("More stuff was typed in the form!");

    const field = event.target.name;
    const value = event.target.value;

    const newState = {};
    newState[field] = value;
    this.setState(newState);
    console.log(newState);
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    const existingUser = {
      email: this.state.email,
      password: this.state.password
    };

    // console.log(existingUser);
    this.props.loginUser(existingUser);
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.isAuthenticated !== prevProps.isAuthenticated) {
  //     this.props.history.push('/dashboard');
  //   }
  // }

  // refactor later
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.props;
    const { email, password } = this.state;

    ;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your account
              </p>
              <form onSubmit={this.onFormSubmit}>
                <div className="form-group">
                  <input
                    className={classnames("form-control form-control-lg", { "is-invalid" : errors.email })}
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={this.onChange}
                  />
                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>

                <div className="form-group">
                  <input
                    className={classnames("form-control form-control-lg", { "is-invalid" : errors.password})}
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={password}
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors
  }
}

export default connect(mapStateToProps, { loginUser })(Login);
