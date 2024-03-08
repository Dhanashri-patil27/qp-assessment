import { body } from 'express-validator';

export const loginRules = () => [
    body('username', 'username missing or Invalid Value').exists().isEmail().not()
        .isEmpty(),
    body('password', 'Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. ')
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false,
            pointsPerUnique: 1,
            pointsPerRepeat: 0.5,
            pointsForContainingLower: 10,
            pointsForContainingUpper: 10,
            pointsForContainingNumber: 10,
            pointsForContainingSymbol: 10,
        }),
];

export const signUpRules = () => [
    body('username', 'username missing or Invalid Value').exists().isEmail().not()
        .isEmpty(),
    body('password', 'Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. ')
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false,
            pointsPerUnique: 1,
            pointsPerRepeat: 0.5,
            pointsForContainingLower: 10,
            pointsForContainingUpper: 10,
            pointsForContainingNumber: 10,
            pointsForContainingSymbol: 10,
        }),
    body('role', 'role missing or Invalid Value').exists().isString().not()
        .isEmpty(),
];
