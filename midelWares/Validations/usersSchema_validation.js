const { body } = require('express-validator');
const { Admin, Manager, User } = require('../../utils/permissions')
const MIN_LENGTH = 2;
const pass_MIN_LENGTH = 3

const ALLOWED_ROLES = [Admin, Manager, User];

const validationMessages = {
    firstName: {
        empty: "First name can't be empty",
        length: `First name must be at least ${MIN_LENGTH} characters long`,
    },
    lastName: {
        empty: "Last name can't be empty",
        length: `Last name must be at least ${MIN_LENGTH} characters long`,
    },
    email: {
        empty: "Email can't be empty",
        invalid: "Email must be valid",
    },
    password: {
        empty: "Password can't be empty",
        length: `Password must be at least ${pass_MIN_LENGTH} characters long`,
    },
    role: {
        empty: "Role can't be empty",
        invalid: `Role must be one of: ${ALLOWED_ROLES.join(', ')}`,
    },
};

const rgisterValidation = () => {
    return [
        // firstName validation
        body('firstName')
            .trim()
            .escape()
            .notEmpty().withMessage(validationMessages.firstName.empty)
            .isLength({ min: MIN_LENGTH }).withMessage(validationMessages.firstName.length),

        // lastName validation
        body('lastName')
            .trim()
            .escape()
            .notEmpty().withMessage(validationMessages.lastName.empty)
            .isLength({ min: MIN_LENGTH }).withMessage(validationMessages.lastName.length),

        // email validation
        body('email')
            .trim()
            .normalizeEmail()
            .notEmpty().withMessage(validationMessages.email.empty)
            .isEmail().withMessage(validationMessages.email.invalid),

        // password validation
        body('password')
            .trim()
            .notEmpty().withMessage(validationMessages.password.empty)
            .isLength({ min: pass_MIN_LENGTH }).withMessage(validationMessages.password.length),

        body('role')
            .trim()
            .notEmpty().withMessage(validationMessages.role.empty)
            .toLowerCase()
            .isIn(ALLOWED_ROLES).withMessage(validationMessages.role.invalid),
    ];

};

const loginValidation = () => {
    return [
        // email validation
        body('email')
            .trim()
            .normalizeEmail()
            .notEmpty().withMessage(validationMessages.email.empty)
            .isEmail().withMessage(validationMessages.email.invalid),

        // password validation
        body('password')
            .trim()
            .notEmpty().withMessage(validationMessages.password.empty)
            .isLength({ min: pass_MIN_LENGTH }).withMessage(validationMessages.password.length),
    ];
}

module.exports = { rgisterValidation, loginValidation };
