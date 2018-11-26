import express, { NextFunction, Request, Response } from 'express';
import Logger from 'js-logger';
import { UserModel, UserModelObject } from '../data/User';

const userRouter = express.Router();

userRouter.route('/')
    .get((req:Request, res:Response, next:NextFunction) =>
    {
        const getresponse = 'this is a get response';

        res.json({getresponse});
        next();
    })
    .put((req:Request, res:Response, next:NextFunction) =>
    {
        const user = res.locals.user as UserModel;

        if( user)
        {
            const q = user.update( req.body, (err:any, raw:any) =>
            {
                if( err)
                {
                    Logger.error(' we has error: ' + err);
                    res.status(404);
                    next();
                    return;
                }

                res.status(201).send(q.getUpdate());

                next();
            });
            return;
        }

        res.status(404);
        next();
    })
    .post((req:Request, res:Response, next:NextFunction) =>
    {
        const { session } = req;
        const user = res.locals.user as UserModel;

        if( user)
        {
            res.status(201).send(user.toJSON());
            next();
            return;
        }
        if( session)
        {
            if( session.userid)
            {
                UserModelObject.findById(session.userid,(err, usermodel:UserModel) =>
                {
                    res.status(201).send(usermodel.toJSON());
                    next();
                });
                return;
            }

            const u = new UserModelObject(req.body);
            u.save();
            session.userid = u._id;
            res.status(201).send(u);
            next();
            return;
        }
        // something broke pretty bad.
        res.status(404);
        next();
    });

export default userRouter;
