"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const mainPageRoutes_1 = __importDefault(require("./routes/mainPageRoutes"));
//import userRoutes from './routes/userRoutes'
const allRoutes_1 = __importDefault(require("./routes/allRoutes"));
class Server {
    constructor() {
        this.PORT = 3000;
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        //process.env.UV_THREADPOOL_SIZE=10;
        this.app.set('port', process.env.PORT || this.PORT);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use('/uploads', express_1.default.static('uploads'));
    }
    routes() {
        this.app.use('/home', mainPageRoutes_1.default);
        this.app.use('/api', allRoutes_1.default);
    }
    start() {
        this.app.listen(3000, () => {
            console.log('Server on port ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
