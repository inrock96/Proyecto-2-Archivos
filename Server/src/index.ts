
import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mainPageRoutes from './routes/mainPageRoutes'
//import userRoutes from './routes/userRoutes'
import allRoutes from './routes/allRoutes'
class Server{
    private PORT = 3000;
    public app:Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }
    config():void{
        this.app.set('port',process.env.PORT||this.PORT);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use('/uploads',express.static('uploads'));
    }
    routes():void{
        this.app.use('/home',mainPageRoutes);
        this.app.use('/api',allRoutes);
    }
    start():void{
        this.app.listen(this.app.get('port'),()=>{
            console.log('Server on port ',this.app.get('port'))
        });
    }
}

const server = new Server();
server.start();