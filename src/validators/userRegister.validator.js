import { body, validationResult } from 'express-validator';

export const userRegisterValidator = [
    body ('first_name')
    .notEmpty().withMessage('First name is required')
    .isString().withMessage('First name must be a string'),

    body('last_name')
    .notEmpty().withMessage('Last name is required')
    .isString().withMessage('Last name must be a string'),

    body('age')
    .notEmpty().withMessage('Age is required')
    .isNumeric().withMessage('Age must be a number')
    .isLength({min: 1}).withMessage('Age must have at least 1 character'),

    body('email')
    .isEmail().withMessage('Email is not valid')
    .notEmpty().withMessage('Email is required'),

    body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({min: 8}).withMessage('Password must have at least 8 characters'),

    body('role')
    .notEmpty().withMessage('Role is required')
    .isString().withMessage('Role must be a string'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            const formattedErrors = errors.array().map(error => {
                return {
                    data: error.path,
                    message: error.msg
                }
            })

            return res.status(400).json({ status: 'Error', errors: formattedErrors });
        }
        next();
    }
];
