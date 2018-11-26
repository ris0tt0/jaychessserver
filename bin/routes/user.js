"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const js_logger_1 = __importDefault(require("js-logger"));
const User_1 = require("../data/User");
const userRouter = express_1.default.Router();
userRouter.route('/')
    .get((req, res, next) => {
    const getresponse = 'this is a get response';
    res.json({ getresponse });
    next();
})
    .put((req, res, next) => {
    const user = res.locals.user;
    if (user) {
        const q = user.update(req.body, (err, raw) => {
            if (err) {
                js_logger_1.default.error(' we has error: ' + err);
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
    .post((req, res, next) => {
    const { session } = req;
    const user = res.locals.user;
    if (user) {
        res.status(201).send(user.toJSON());
        next();
        return;
    }
    if (session) {
        if (session.userid) {
            User_1.UserModelObject.findById(session.userid, (err, usermodel) => {
                res.status(201).send(usermodel.toJSON());
                next();
            });
            return;
        }
        const u = new User_1.UserModelObject(req.body);
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
exports.default = userRouter;
//# sourceMappingURL=user.js.map