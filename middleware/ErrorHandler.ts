import { Request, Response, NextFunction } from 'express';

const handleErrorAsync = (func: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await func(req, res, next);
        } catch (error: any) {
            const code = error.statusCode || 500;
            let responseCode = null
            const responceObj = { responseCode, code, message: error.message };
            if (error.responseCode) {
                res.setHeader('x-response-code', error.responseCode);
                responceObj.responseCode = error.responseCode;
            }
            res.status(code).send(responceObj);
            if (error.responseCode == '440000') {
                delete error.stack;
            }
            next(error);
        }
    };

export default handleErrorAsync;
