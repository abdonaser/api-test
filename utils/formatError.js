function errorMessage(error) {
    /**
     * [
      {
        type: 'field',
        value: '',
        msg: "can't be empty",
        path: 'title',
        location: 'body'
      },
      {
        type: 'field',
        value: '',
        msg: 'must be more than 2char',
        path: 'title',
        location: 'body'
      },
      {
        type: 'field',
        value: undefined,
        msg: "can't be empty",
        path: 'price',
        location: 'body'
      }
    ]
     */
    const destructuredErrors = error.reduce((acc, error) => {
        if (!acc[error.path]) {
            acc[error.path] = [];
        }
        acc[error.path].push(error.msg);
        return acc;
    }, {});

    const errResult = Object.keys(destructuredErrors).reduce((acc, key) => {
        acc[key] = destructuredErrors[key].join(' && ')
        return acc;
    }, {})

    const formattedString = Object.entries(errResult)
        .map(([key, value]) => `${key}: "${value}"`)
        .join(' and ')

    return errResult
}


module.exports = errorMessage