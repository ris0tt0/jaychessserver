"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const js_logger_1 = __importDefault(require("js-logger"));
const ChessGame_1 = require("../../data/ChessGame");
const chessGameRouter = express_1.default.Router();
chessGameRouter.use('/', (req, res, next) => {
    if (res.locals.user) {
        next();
        return;
    }
    js_logger_1.default.warn('chessGameRouter USER not available');
    res.redirect('/');
});
chessGameRouter.route('/')
    // creates a new game nulling any other game.
    .post((req, res, next) => {
    const user = res.locals.user;
    if (user.currentGameId) {
        ChessGame_1.ChessGameModelObject.findById(user.currentGameId, (err, chessgamemodel) => {
            if (err)
                js_logger_1.default.error('curreng game id error: ' + err);
            res.status(201).send(chessgamemodel);
            next();
        });
        return;
    }
    const chessgame = new ChessGame_1.ChessGameModelObject();
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
    .get((req, res, next) => {
    const user = res.locals.user;
    // user.hexcolor = '0';
    res.status(404);
    next();
})
    // update the game state.
    .put((req, res, next) => {
    res.status(404);
    next();
});
exports.default = chessGameRouter;
//# sourceMappingURL=chessrouter.js.map