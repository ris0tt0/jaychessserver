"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const js_logger_1 = __importDefault(require("js-logger"));
const api_1 = require("./api");
const database_1 = require("./database");
class Main {
    constructor(gameemitter) {
        this.gameemitter = gameemitter;
        this.onRestApiMove = (move) => {
            js_logger_1.default.info('Main::onRestApiMove ' + move);
        };
        js_logger_1.default.info('Main::constructor();');
        this.gameemitter.on(api_1.MOVE, this.onRestApiMove);
    }
}
js_logger_1.default.useDefaults();
const database = new database_1.DataBase('mongodb://localhost/chessgame');
const restapi = new api_1.RestApi();
const m = new Main(restapi);
//# sourceMappingURL=Index.js.map