function isEmpty(value) {
  return(
    value === undefined ||
    value === null ||
    // checking object
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    // checking string
    (typeof value === 'string' && value.trim().length === 0)
  );
}

export default isEmpty;
