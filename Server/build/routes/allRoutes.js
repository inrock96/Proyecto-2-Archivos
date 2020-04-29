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
        this.router.post('/verifyUser', allController_1.default.verifyUser);
        this.router.post('/uploadFile', upload.single('file'), allController_1.default.uploadFile);
        //
    }
}
exports.default = new AllRoutes().router;
