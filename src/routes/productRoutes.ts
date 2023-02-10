import {Router} from 'express';
import ProductController from '../controllers/ProductController';
// import {checkJwt} from './../middlewares/jwt'
// import {checkRole} from './../middlewares/role'

class UserRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', ProductController.getAll);
        this.router.get('/:id', ProductController.getById);
        this.router.post('/', ProductController.newProduct);
    }

}

const productRoutes = new UserRoutes();
export default productRoutes.router;