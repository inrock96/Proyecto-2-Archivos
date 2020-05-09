"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const allController_1 = __importDefault(require("../controllers/allController"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads/');
    },
    filename: (req, file, callBack) => {
        callBack(null, 'Alie_' + file.originalname.replace(/\s+/g, ''));
    }
});
const upload = multer_1.default({ storage: storage });
class AllRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Usuarios
        this.router.post('/getUser', allController_1.default.getUser);
        this.router.post('/addUser', allController_1.default.addUser);
        this.router.post('/deleteUser/:id', allController_1.default.deleteUser);
        this.router.post('/verifyUser', allController_1.default.verifyUser);
        this.router.post('/uploadFile', upload.single('file'), allController_1.default.uploadFile);
        this.router.post('/updateContrasena', allController_1.default.updateUserPassword);
        //productos
        this.router.post('/addProduct', allController_1.default.addProduct);
        this.router.post('/buscarProductos', allController_1.default.buscarProductos);
        //categorias
        this.router.post('/addCategoria', allController_1.default.addCategoria);
        this.router.get('/getCategorias', allController_1.default.getCategorias);
        this.router.post('/getCategoria', allController_1.default.getCategoria);
        //colores
        this.router.get('/getColores', allController_1.default.getColores);
        //reportes
        this.router.post('/reporte1', allController_1.default.reporte1);
        this.router.post('/reporte2', allController_1.default.reporte2);
        this.router.post('/reporte3', allController_1.default.reporte3);
        this.router.post('/reporte4', allController_1.default.reporte4);
        this.router.post('/reporte5', allController_1.default.reporte5);
        this.router.post('/reporte6', allController_1.default.reporte6);
        this.router.post('/reporte7', allController_1.default.reporte7);
        this.router.post('/reporte8', allController_1.default.reporte8);
        this.router.post('/reporte9', allController_1.default.reporte9);
        this.router.post('/reporte10', allController_1.default.reporte10);
        //Correo
        this.router.post('/sendMail', allController_1.default.sendMail);
    }
}
exports.default = new AllRoutes().router;
