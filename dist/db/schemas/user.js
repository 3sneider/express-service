"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    email: { type: String, unique: true, required: true, lowercase: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    avatar: String,
    password: { type: String, required: true },
});
exports.default = (0, mongoose_1.model)('user', schema);
