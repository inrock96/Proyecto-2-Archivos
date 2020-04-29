"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oracledb_1 = __importDefault(require("oracledb"));
var connAttrs = {
    "user": "inti",
    "password": "qwer1234",
    "connectString": "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"
};
class MainPageController {
    getMainPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield oracledb_1.default.getConnection(connAttrs, function (err, connection) {
                if (err) {
                    res.set('Content-Type', 'application/JSON');
                    res.status(500).json({ status: 500,
                        message: "Error connecting to db",
                        detailed_message: err.message });
                    return;
                }
                connection.execute("SELECT * FROM pagina_inicio", {}, {
                    outFormat: oracledb_1.default.OUT_FORMAT_OBJECT
                }, function (err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/JSON');
                        res.status(500).json({ status: 500,
                            message: "Error using to db",
                            detailed_message: err.message });
                        return;
                    }
                    else {
                        res.header('Access-Control-Allow-Origin', '*');
                        res.header('Access-Control-Allow-Headers', 'Content-Type');
                        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                        res.contentType('application/json').status(200);
                        res.json(result.rows);
                    }
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                            console.log('No se pudo ejecutar delete');
                        }
                        else {
                            console.log("GET /home : Connection released");
                        }
                    });
                });
            });
        });
    }
}
const mainPageController = new MainPageController;
exports.default = mainPageController;
