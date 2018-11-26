"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    currentGameId: String,
    hexcolor: String,
}, {
    toJSON: {
        transform: (doc, ret, options) => {
            // no id sent to client.
            delete ret._id;
            return ret;
        },
    },
});
exports.UserModelObject = mongoose_1.model('User', exports.UserSchema);
//# sourceMappingURL=User.js.map