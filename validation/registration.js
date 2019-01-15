const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegistrationInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if(!Validator.isLength(data.name, { min: 3, max: 30 })){
    errors.name = 'Name must be between 3 and 30 characters';
  }

  if(Validator.isEmpty(data.name)) {
    errors.name = 'Name is required';
  }

  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if(!Validator.isEmail(data.email)) {
    errors.email = 'Invalid email';
  }

  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  if(!Validator.isLength(data.password, { min: 5, max: 20 })) {
    errors.password = 'Password must be at least 5 characters and no greater than 20';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  }
}
