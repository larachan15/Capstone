const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.userProfile = !isEmpty(data.userProfile) ? data.userProfile : '';

  if(!Validator.isLength(data.userProfile, { min: 3, max: 40 })) {
    errors.userProfile = 'User Profile needs to be between 3 and 40 characters.'
  }

  if(Validator.isEmpty(data.userProfile)) {
    errors.userProfile = 'User Profile is required.'
  }

  // Valid if errors are empty
  return {
    errors: errors,
    isValid: isEmpty(errors)
  }
}
