import express,{Router} from 'express';
import mainPageController from '../controllers/mainPageController'

class MainPageRoutes{
    public router:Router = Router();
    constructor(){
        this.config();
    }
    
    config(){
        this.router.get('/',mainPageController.getMainPage)
        
    }
}

export default new MainPageRoutes().router