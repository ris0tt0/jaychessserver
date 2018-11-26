"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../data/User");
const rootRouter = express_1.default.Router();
rootRouter.use('/', (req, res, next) => {
    const { session } = req;
    const { user } = res.locals;
    if (session && session.userid && user == null) {
        User_1.UserModelObject.findById(session.userid, (err, usermodel) => {
            // save the logged in user
            res.locals.user = usermodel;
            next();
        });
        return;
    }
    next();
});
exports.default = rootRouter;
//# sourceMappingURL=root.js.map