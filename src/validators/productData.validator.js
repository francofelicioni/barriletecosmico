import { body, validationResult } from 'express-validator';

export const productDataValidator = [
    body ('title')
    .notEmpty().withMessage('Title is required')
    .isString().withMessage('Title must be a string')
    .isLength({min: 3}).withMessage('Title must have at least 3 characters'),

    body ('description')
    .notEmpty().withMessage('Description is required')
    .isString().withMessage('Description must be a string'),

    body ('code')
    .notEmpty().withMessage('Code is required')
    .isAlphanumeric().withMessage('Code must be alphanumeric')
    .isLength({min: 3}).withMessage('Code must have at least 3 characters'),
    
    body ('stock')
    .notEmpty().withMessage('Stock is required'),
    
    body ('stock')
    .notEmpty().withMessage('Stock is required')
    .isNumeric().withMessage('Stock must be a number')
    .isLength({min: 1}).withMessage('Stock must have at least 1 character'),

    body('price')
    .notEmpty().withMessage('Price is required')
    .isNumeric().withMessage('Price must be a number')
    .isLength({min: 1}).withMessage('Price must have at least 1 character'),

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
