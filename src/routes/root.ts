import express, { NextFunction, Request, Response } from 'express';
import { UserModel, UserModelObject } from '../data/User';

const rootRouter = express.Router();

rootRouter.use('/', (req:Request, res:Response, next:NextFunction) =>
    {
        const { session } = req;
        const { user } = res.locals;

        if( session && session.userid && user == null)
        {
            UserModelObject.findById(session.userid,(err:any, usermodel:UserModel) =>
            {
                // save the logged in user
                res.locals.user = usermodel;
                next();
            });
            return;
        }
        next();
    });

export default rootRouter;
