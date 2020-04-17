"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/');
    }
}
