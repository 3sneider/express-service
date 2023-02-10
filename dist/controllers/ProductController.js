"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const produc_1 = __importDefault(require("../db/schemas/produc"));
const mongoose_1 = require("mongoose");
class ProductController {
    // private userRepository = getRepository(User);
    // get all products
    static async getAll(req, res) {
        try {
            const products = await produc_1.default.find({});
            if (products.length > 0) {
                res.status(202).send(products);
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
_a = ProductController;
// get one product
ProductController.getById = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await produc_1.default.findById(productId);
        if (product) {
            res.status(200).send(product);
        }
        else {
            res.status(404).json({ message: 'Not result!' });
        }
    }
    catch (e) {
        res.status(400).json({ message: 'Not result!' });
    }
};
// create new product
ProductController.newProduct = async (req, res) => {
    const { name, year, description, price, user } = req.body;
    try {
        const newProduct = new produc_1.default({ name, year, description, price, user });
        await newProduct.save();
        res.json({ status: res.status, data: newProduct });
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
exports.default = ProductController;
