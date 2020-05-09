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
        this.router.get('/getCategorias',allController.getCategorias);
        this.router.post('/getCategoria',allController.getCategoria);
        //colores
        this.router.get('/getColores',allController.getColores);
        //reportes
        this.router.post('/reporte1',allController.reporte1);
        this.router.post('/reporte2',allController.reporte2);
        this.router.post('/reporte3',allController.reporte3);
        this.router.post('/reporte4',allController.reporte4);
        this.router.post('/reporte5',allController.reporte5);
        this.router.post('/reporte6',allController.reporte6);
        this.router.post('/reporte7',allController.reporte7);
        this.router.post('/reporte8',allController.reporte8);
        this.router.post('/reporte9',allController.reporte9);
        this.router.post('/reporte10',allController.reporte10);
        //Correo
        this.router.post('/sendMail',allController.sendMail); 
    }
}

export default new AllRoutes().router