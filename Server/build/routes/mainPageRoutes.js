"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mainPageController_1 = __importDefault(require("../controllers/mainPageController"));
class MainPageRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', mainPageController_1.default.getMainPage);
    }
}
exports.default = new MainPageRoutes().router;
