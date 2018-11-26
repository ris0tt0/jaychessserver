"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.ChessGameSchema = new mongoose_1.Schema({
    darkPlayerId: String,
    isDarkTurn: Boolean,
    isGameComplete: Boolean,
    lightPlayerId: String,
    moves: Array,
});
exports.ChessGameModelObject = mongoose_1.model('ChessGame', exports.ChessGameSchema);
//# sourceMappingURL=ChessGame.js.map