const Ajv = require('ajv');
const ajv = new Ajv();
const course_schema = {
    type: 'object',
    properties: {
        name: { type: 'string', pattern: '^[a-zA-Z]*$' },
        price: {
            type: 'number',
        },
    },
    required: ['name', 'price'],
    additionalProperties: false,
};
module.exports = ajv.compile(course_schema);