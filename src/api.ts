import BodyParser from 'body-parser';
import EventEmitter from 'events';
import express, { Express, Request } from 'express';
import session, { SessionOptions } from 'express-session';
import Logger from 'js-logger';
import multer from 'multer';
import chessGameRouter from './routes/game/chessrouter';
import userRouter from './routes/user';

import { UserModel } from './data/User';
import rootRouter from './routes/root';

export const MOVE = Symbol('move');

export interface ApiRequest extends Request
{
    user:UserModel;
}

export class RestApi extends EventEmitter
{
    private server: Express;

    constructor()
    {
        super();
        Logger.info('RestApi::constructor()');

        const upload = multer();
        this.server = express();
        this.setupMiddleware( this.server);
        this.setupRoutes( this.server);
        // start up
        this.server.listen(3000, this.onServerStarted);
    }

    private setupMiddleware = (app:Express) =>
    {
        Logger.debug('RestApi::setupMiddleware()');

        app.use(BodyParser.json());
        app.use(BodyParser.urlencoded({ extended: true }));
        app.use( session({ secret: 'keyboarder Kathmandu', cookie: { maxAge: 600000 }}));
    }

    private setupRoutes = (app:Express) =>
    {
        Logger.debug('RestApi::setupRoutes()');

        app.use( '/api', rootRouter);
        app.use( '/api/user', userRouter);
        app.use( '/api/game/chessgame', chessGameRouter);
    }

    private onServerStarted = () =>
    {
        Logger.debug('RestApi::onServerStarted()');
    }
}
