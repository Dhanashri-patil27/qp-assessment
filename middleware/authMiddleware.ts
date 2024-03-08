import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import ErrorCodes from '../errors/ErrorCodes';

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const secretKey = 'secret';
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.trim();
    if (!token) {
        let errorCode = ErrorCodes['300005']
        res.status(401).send(errorCode)
    } else {
        jwt.decode(token);
        jwt.verify(token, secretKey, (err, decodedToken) => {
            if (err) {
                let errorCode = ErrorCodes['300005']
                res.status(401).send(errorCode)
            }
            const user = decodedToken as JwtPayload;
            req.user = user;
            next();
        });
    }

};

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.role == 'admin') {
        return next();
    } else {

        let errorCode = ErrorCodes['300006']
        res.status(403).send(errorCode)
    }
}

