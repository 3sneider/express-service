import {Router} from 'express';
import UserController from '../controllers/UserController';
// import {checkJwt} from './../middlewares/jwt'
// import {checkRole} from './../middlewares/role'

class UserRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', UserController.getAll);
        this.router.get('/:id', UserController.getById);
        this.router.post('/', UserController.newUser);
    }

}

const userRoutes = new UserRoutes();
export default userRoutes.router;