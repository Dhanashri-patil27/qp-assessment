import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import users from '../models/users';
import ErrorCodes from '../errors/ErrorCodes';

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await users.findOne({ where: { username } });
        if (!user) {
            let errorCode = ErrorCodes['300000']
            throw errorCode
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            let errorCode = ErrorCodes['300001']
            throw errorCode
        }

        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, 'secret', {
            expiresIn: '1h',
        });
        res.json({ token });
    } catch (error: any) {
        let errorCode = ErrorCodes['300002']
        errorCode.message = error.message;
        throw errorCode
    }
};

export const signUp = async (req: Request, res: Response) => {
    const { username, password, role } = req.body;
    try {
        const user = await users.findOne({ where: { username } });
        if (user) {
            let errorCode = ErrorCodes['300003']
            throw errorCode
        }

        const saltRounds = 10; // Number of salt rounds for bcrypt
        let hashePassowrd = await bcrypt.hash(password, saltRounds)
        await users.create({
            username,
            password: hashePassowrd,
            role
        });
        res.json({ message: "User has been created successfully" });
    } catch (error: any) {
        let errorCode = ErrorCodes['300004']
        errorCode.message = error.message;
        throw errorCode
    }
};
