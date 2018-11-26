"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gameRouter = express_1.default.Router();
gameRouter.route('/:gameid')
    .get((req, res, next) => {
    const getresponse = 'this is a get response';
    res.json({ getresponse });
})
    .post((req, res, next) => {
    const postresponse = 'post response';
    res.json({ postresponse });
});
exports.default = gameRouter;
//# sourceMappingURL=game.js.map