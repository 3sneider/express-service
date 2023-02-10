import { Request, Response } from 'express';

class IndexController {

    static index (req: Request, res: Response): void {
        res.render('index', { title: 'Welcome to Books App'});        
    }

}

export default IndexController;