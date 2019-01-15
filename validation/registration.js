const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegistrationInput(data) {
  let errors = {};

  if(!Validator.isLength(data.name, { min: 3, max: 30 })){
    errors.name = 'Name must be between 3 and 30 characters';
  }
  return {
    errors: errors,
    isValid: isEmpty(errors)
  }
}
