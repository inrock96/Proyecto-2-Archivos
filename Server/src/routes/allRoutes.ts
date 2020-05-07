import express,{Router} from 'express';
import allController from '../controllers/allController'
import multer from 'multer';
const storage = multer.diskStorage({
    destination:(req,file,callBack)=>{
        callBack(null,'./uploads/')
    },
    filename:(req,file,callBack)=>{
        callBack(null,'Alie_'+file.originalname.replace(/\s+/g, ''));
    }
})
const upload = multer({storage:storage});
class AllRoutes{
    public router:Router = Router();
    constructor(){
        this.config();
    }    
    config(){
        //Usuarios
        this.router.post('/getUser',allController.getUser);
        this.router.post('/addUser',allController.addUser);
        this.router.post('/deleteUser/:id',allController.deleteUser)
        this.router.post('/verifyUser',allController.verifyUser);
        this.router.post('/uploadFile',upload.single('file'),allController.uploadFile);
        this.router.post('/updateContrasena',allController.updateUserPassword);
        
        //productos
        this.router.post('/addProduct',allController.addProduct)
        this.router.post('/buscarProductos',allController.buscarProductos);
        //categorias
        this.router.post('/addCategoria',allController.addCategoria);
        //Correo
        this.router.post('/sendMail',allController.sendMail); 
    }
}

export default new AllRoutes().router