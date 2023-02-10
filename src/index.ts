import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import connect from './db/connection';
import compression from 'compression';
import userRoutes from './routes/userRoutes'; 
import indexRoutes from './routes/indexRoutes'; 
import productRoutes from './routes/productRoutes'; 
import { engine } from 'express-handlebars';
import path from 'path';


class server {
    
    public app: express.Application
    public PORT = process.env.PORT || 3000;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(){        
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
        this.app.use(compression());
        this.app.use(express.json());        
        this.app.use(express.urlencoded({ extended: false}));  
        
        // esto no me ha querido funcionar,
        // para probarlo nestoy usando el controlador indexS
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.engine('.hbs', engine({
            extname: '.hbs',
            defaultLayout: 'main',
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            helpers: require('./utils/helpers')
        }));
        this.app.set('view engine', '.hbs');
        
    }

    routes(){
        this.app.use('/api', indexRoutes);
        this.app.use('/api/users', userRoutes);        
        this.app.use('/api/products', productRoutes);        
    }

    start(){

        connect()
            .then((connected:boolean) => {
                if(connected){
                    this.app.listen(this.PORT, () => {
                        console.log(`Server running on port ${this.PORT}`);
                    }) 
                }else{
                    console.log('Error MongoDB');
                }                
            })
            .catch(err => console.error(err));       
    }

}

const serve: server = new server();
serve.start();