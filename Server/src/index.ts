
import express, {Application} from 'express'
import userRoutes from './routes/userRoutes'
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
    }
    routes():void{
        
    }
    start():void{
        this.app.listen(this.app.get('port'),()=>{
            console.log('Server on port ',this.app.get('port'))
        });
    }
}

const server = new Server();
server.start();