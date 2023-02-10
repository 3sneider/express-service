// import {getRepository} from "typeorm";
import {Request, Response} from "express";
import ProductsModel from "../db/schemas/produc";
import {mongo} from 'mongoose';




class ProductController {

    // private userRepository = getRepository(User);

    // get all products
    static async getAll( req:Request, res:Response): Promise<void> {                
        
        try {                                    
            const products = await ProductsModel.find({})                                         
            if (products.length > 0) {
                res.status(202).send(products);
            }else{
                res.status(404).json({ message: 'Not result!!'})
            }    
            // res.render('index', {title: 'welcome'})    
        } catch (e) {     
            console.log(e);
            res.status(404).json({ message: 'Something goes wron with the conection...!'})
        }
            
               
    } 

    // get one product
    static getById = async ( req:Request, res:Response): Promise<void> => {        
        const { productId } = req.params;

        try {
            const product = await ProductsModel.findById(productId);

            if(product){
                res.status(200).send(product);
            }else{
                res.status(404).json({ message: 'Not result!'})    
            }
            
        } catch (e) {
            res.status(400).json({ message: 'Not result!'})
        }
    
    } 

    // create new product
    static newProduct = async ( req:Request, res:Response): Promise<void> => {        
        const { name, year, description, price, user } = req.body;

        try {
            const newProduct = new ProductsModel({name, year, description, price, user});

            await newProduct.save();
            res.json({status: res.status, data: newProduct}); 
        } catch (e) {
            if(e instanceof mongo.MongoError){
                res.status(400).json({ message: 'Error DB!', data: e.errmsg})
            }else{
                res.status(500).json({ message: 'Error Server!'})
            }
            
        }        
        
    } 

    // // edit user
    // static editUser = async ( req:Request, res:Response) => {
        // const { url } = req.params;
        // const post = await Post.findOneAndUpdate({url}, req.body);
        // res.json({status: res.status, data: post});
    // } 

    // // delete user
    // static deleteUser = async ( req:Request, res:Response) => {
        // await Post.findOneAndRemove({ url: req.params.url });
        // res.json({ response: 'Post deleted Successfully' });
    // } 

}

export default ProductController;