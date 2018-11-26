"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const events_1 = __importDefault(require("events"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const js_logger_1 = __importDefault(require("js-logger"));
const multer_1 = __importDefault(require("multer"));
const chessrouter_1 = __importDefault(require("./routes/game/chessrouter"));
const user_1 = __importDefault(require("./routes/user"));
const root_1 = __importDefault(require("./routes/root"));
exports.MOVE = Symbol('move');
class RestApi extends events_1.default {
    constructor() {
        super();
        this.setupMiddleware = (app) => {
            js_logger_1.default.debug('RestApi::setupMiddleware()');
            app.use(body_parser_1.default.json());
            app.use(body_parser_1.default.urlencoded({ extended: true }));
            app.use(express_session_1.default({ secret: 'keyboarder Kathmandu', cookie: { maxAge: 600000 } }));
        };
        this.setupRoutes = (app) => {
            js_logger_1.default.debug('RestApi::setupRoutes()');
            app.use('/api', root_1.default);
            app.use('/api/user', user_1.default);
            app.use('/api/game/chessgame', chessrouter_1.default);
        };
        this.onServerStarted = () => {
            js_logger_1.default.debug('RestApi::onServerStarted()');
        };
        js_logger_1.default.info('RestApi::constructor()');
        const upload = multer_1.default();
        this.server = express_1.default();
        this.setupMiddleware(this.server);
        this.setupRoutes(this.server);
        // start up
        this.server.listen(3000, this.onServerStarted);
    }
}
exports.RestApi = RestApi;
//# sourceMappingURL=api.js.map