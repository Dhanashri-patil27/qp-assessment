import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import ErrorCodes from '../errors/ErrorCodes';
import ErrorHandler from './ErrorHandler';
import ApplicationError from '../errors/ApplicationError';

const validator = ErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const validationErrors = errors.array() as ValidationError[];
    const errorMessage = validationErrors[0].msg;

    const error = { ...ErrorCodes['100000'] };
    error.message = errorMessage;

    throw new ApplicationError(error);
});


export default validator;
