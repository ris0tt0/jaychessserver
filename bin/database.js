"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const js_logger_1 = __importDefault(require("js-logger"));
const mongoose_1 = __importDefault(require("mongoose"));
const ChessGame_1 = require("./data/ChessGame");
class DataBase {
    constructor(url) {
        this.url = url;
        js_logger_1.default.info('DataBase::constructor() url:' + this.url);
        mongoose_1.default.connect(this.url);
        const db = mongoose_1.default.connection;
        // db.on('error', )
        db.once('open', () => {
            js_logger_1.default.info('DataBase open:' + this.url);
            const game = new ChessGame_1.ChessGameModelObject();
        });
    }
}
exports.DataBase = DataBase;
//# sourceMappingURL=database.js.map