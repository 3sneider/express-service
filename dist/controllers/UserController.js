"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../db/schemas/user"));
const mongoose_1 = require("mongoose"); //Types
const bcrypt_1 = __importDefault(require("bcrypt"));
// import {validate} from 'class-validator';
class UserController {
    // private userRepository = getRepository(User);
    // get all users
    static async getAll(req, res) {
        const itemsPerPage = 20;
        const page = parseInt(req.query.page);
        // const start = (page - 1) * itemsPerPage;
        // const end: number = page * itemsPerPage;
        const total = await user_1.default.count();
        try {
            const users = await user_1.default.find({}).select({ password: 0 }); // con esta opcion de select no retorna la contraseña                                                  
            if (users.length > 0) {
                // res.status(202).send(users);
                // si se requiere un filtro de pagina ?pagina=n
                res.status(202).send({
                    page: page,
                    per_page: itemsPerPage,
                    total: total,
                    total_pages: Math.ceil(total / itemsPerPage),
                    data: users,
                });
            }
            else {
                res.status(404).json({ message: 'Not result!!' });
            }
            // res.render('index', {title: 'welcome'})    
        }
        catch (e) {
            console.log(e);
            res.status(404).json({ message: 'Something goes wron with the conection...!' });
        }
    }
}
_a = UserController;
// get one user
UserController.getById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await user_1.default.findById(userId);
        if (user) {
            res.status(200).send(user);
        }
        else {
            res.status(404).json({ message: 'Not result!' });
        }
    }
    catch (e) {
        res.status(400).json({ message: 'Not result!' });
    }
};
// create new user
UserController.newUser = async (req, res) => {
    const { email, first_name, last_name, avatar, password } = req.body;
    const hash = await bcrypt_1.default.hash(password, 15);
    try {
        const newUser = new user_1.default({ email, first_name, last_name, avatar, password: hash });
        await newUser.save();
        res.json({ status: res.status, data: newUser });
    }
    catch (e) {
        if (e instanceof mongoose_1.mongo.MongoError) {
            res.status(400).json({ message: 'Error DB!', data: e.errmsg });
        }
        else {
            res.status(500).json({ message: 'Error Server!' });
        }
    }
};
exports.default = UserController;
