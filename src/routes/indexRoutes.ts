import {Router} from 'express';
import IndexController from '../controllers/IndexController';

class IndexRoutes {

    public router: Router = Router();

    constructor(){
        this.config();    
    }

    config(){
        this.router.get('/', IndexController.index);        
    }

}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;