import {Router} from 'express'

class UserRoutes{
    public router:Router = Router();
    constructor(){
        this.config();
    }
    
    config(){
        this.router.get('/')
    }
}