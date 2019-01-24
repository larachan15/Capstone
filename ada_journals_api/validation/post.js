const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if(!Validator.isLength(data.text, { min: 1, max: 500 })) {
    errors.text = 'Post must be between 1 and 500 characters';
  }

  if(Validator.isEmpty(data.text)) {
    errors.email = 'Some text is required to make a post';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  }
}
