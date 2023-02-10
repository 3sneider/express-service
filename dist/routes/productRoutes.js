"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = __importDefault(require("../controllers/ProductController"));
// import {checkJwt} from './../middlewares/jwt'
// import {checkRole} from './../middlewares/role'
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', ProductController_1.default.getAll);
        this.router.get('/:id', ProductController_1.default.getById);
        this.router.post('/', ProductController_1.default.newProduct);
    }
}
const productRoutes = new UserRoutes();
exports.default = productRoutes.router;
