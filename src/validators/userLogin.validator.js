import { body, validationResult } from 'express-validator';

export const userLoginValidator = [
    body ('email')
    .isEmail().withMessage('Email is not valid')
    .notEmpty().withMessage('Email is required'),

    body('password')
    .notEmpty().withMessage('Password is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'Error', payload: errors });
        }
        next();
    }
];
