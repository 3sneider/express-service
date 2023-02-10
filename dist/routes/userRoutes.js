"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
// import {checkJwt} from './../middlewares/jwt'
// import {checkRole} from './../middlewares/role'
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', UserController_1.default.getAll);
        this.router.get('/:id', UserController_1.default.getById);
        this.router.post('/', UserController_1.default.newUser);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
