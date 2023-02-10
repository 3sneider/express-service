// import {getRepository} from "typeorm";
import {Request, Response} from "express";
import UsersModel from "../db/schemas/user";
import {mongo} from 'mongoose'; //Types
import bcrypt from 'bcrypt';


// import {validate} from 'class-validator';

class UserController {

    // private userRepository = getRepository(User);

    // get all users
    static async getAll( req:Request, res:Response): Promise<void> {                
        
        const itemsPerPage = 20;
        const page: number = parseInt(req.query.page as string);
        // const start = (page - 1) * itemsPerPage;
        // const end: number = page * itemsPerPage;
        const total: number = await UsersModel.count();

        try {                                    
            const users = await UsersModel.find({}).select({password:0}); // con esta opcion de select no retorna la contraseña                                                  
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

            }else{
                res.status(404).json({ message: 'Not result!!'})
            }    
            // res.render('index', {title: 'welcome'})    
        } catch (e) {     
            console.log(e);
            res.status(404).json({ message: 'Something goes wron with the conection...!'})
        }
            
               
    } 

    // get one user
    static getById = async ( req:Request, res:Response): Promise<void> => {        
        const { userId } = req.params;

        try {
            const user = await UsersModel.findById(userId);

            if(user){
                res.status(200).send(user);
            }else{
                res.status(404).json({ message: 'Not result!'})    
            }
            
        } catch (e) {
            res.status(400).json({ message: 'Not result!'})
        }
    
    } 

    // create new user
    static newUser = async ( req:Request, res:Response): Promise<void> => {
        const { email, first_name, last_name, avatar, password } = req.body;
        const hash: string = await bcrypt.hash(password, 15);

        try {
            const newUser = new UsersModel({email, first_name, last_name, avatar, password:hash});

            await newUser.save();
            res.json({status: res.status, data: newUser}); 
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
        // const deleted = await Products.deleteOne({ _id: Types.ObjectId(productId), }); // esta linea requiere types de moongose
        // await Post.findOneAndRemove({ url: req.params.url });
        // res.json({ response: 'Post deleted Successfully' });
    // } 

}

export default UserController;