"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./db/connection"));
const compression_1 = __importDefault(require("compression"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const express_handlebars_1 = require("express-handlebars");
const path_1 = __importDefault(require("path"));
class server {
    constructor() {
        this.PORT = process.env.PORT || 3000;
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.use((0, cors_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        // esto no me ha querido funcionar,
        // para probarlo nestoy usando el controlador indexS
        this.app.set('views', path_1.default.join(__dirname, 'views'));
        this.app.engine('.hbs', (0, express_handlebars_1.engine)({
            extname: '.hbs',
            defaultLayout: 'main',
            layoutsDir: path_1.default.join(this.app.get('views'), 'layouts'),
            partialsDir: path_1.default.join(this.app.get('views'), 'partials'),
            helpers: require('./utils/helpers')
        }));
        this.app.set('view engine', '.hbs');
    }
    routes() {
        this.app.use('/api', indexRoutes_1.default);
        this.app.use('/api/users', userRoutes_1.default);
        this.app.use('/api/products', productRoutes_1.default);
    }
    start() {
        (0, connection_1.default)()
            .then((connected) => {
            if (connected) {
                this.app.listen(this.PORT, () => {
                    console.log(`Server running on port ${this.PORT}`);
                });
            }
            else {
                console.log('Error MongoDB');
            }
        })
            .catch(err => console.error(err));
    }
}
const serve = new server();
serve.start();
