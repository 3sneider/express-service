"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    static index(req, res) {
        res.render('index', { title: 'Welcome to Books App' });
    }
}
exports.default = IndexController;
