import express, { NextFunction, Request, Response } from 'express';
import Logger from 'js-logger';
import { ChessGameModel, ChessGameModelObject } from '../../data/ChessGame';
import { UserModel } from '../../data/User';

const chessGameRouter = express.Router();

chessGameRouter.use('/', (req:Request, res:Response, next:NextFunction) =>
{
    if( res.locals.user)
    {
        next();
        return;
    }
    Logger.warn('chessGameRouter USER not available');
    res.redirect('/');
});

chessGameRouter.route('/')
    // creates a new game nulling any other game.
    .post((req:Request, res:Response, next:NextFunction) =>
    {
        const user = res.locals.user as UserModel;

        if (user.currentGameId)
        {
            ChessGameModelObject.findById(user.currentGameId, (err:any, chessgamemodel:ChessGameModel) =>
            {
                if( err) Logger.error('curreng game id error: ' + err);

                res.status(201).send( chessgamemodel);
                next();
            });
            return;
        }
        const chessgame  = new ChessGameModelObject();
        const currentGameId = chessgame._id;

        user.currentGameId = currentGameId;

        user.save();

        chessgame.lightPlayerId = user._id;
        chessgame.isGameComplete = false;
        chessgame.isDarkTurn = false;

        chessgame.save();

        res.status(201).send(chessgame);
        next();
    });

chessGameRouter.route('/:gameid')
    // returns the current game, game state for id.
    .get((req:Request, res:Response, next:NextFunction) =>
    {
        const user = res.locals.user as UserModel;
        // user.hexcolor = '0';

        res.status(404);
        next();
    })
    // update the game state.
    .put((req:Request, res:Response, next:NextFunction) =>
    {
        res.status(404);
        next();
    });

export default chessGameRouter;
