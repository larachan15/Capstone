import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/postActions';
import classnames from 'classnames';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  // renders errors on page
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    const newState = {};
    newState[field] = value;
    this.setState(newState);
    // console.log(newState);
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    const { user } = this.props.auth;
    const { postId } = this.props;

    const newComment = {
      text: this.state.text,
      name: user.name
    };

    this.props.addComment(postId, newComment);
    this.setState({
      text: ''
    });
  }

  render() {
    const { errors } = this.props;
    // const { text } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <h4 className="card-header text-muted">Write a comment...</h4>
          <div className="card-body">
            <form onSubmit={this.onFormSubmit}>
              <div className="form-group">
                <textarea
                  className={classnames("form-control form-control-md", { "is-invalid" : errors.text })}
                  placeholder="Comment on post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                />
                { errors.text && (<div className="invalid-feedback">{errors.text}</div>) }
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

CommentForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors
  }
}

export default connect(mapStateToProps, { addComment })(CommentForm);
