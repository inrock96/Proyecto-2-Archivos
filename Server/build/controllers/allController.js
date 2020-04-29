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
class AllController {
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var pcorreo = req.body.correo;
            yield oracledb_1.default.getConnection(connAttrs, function (err, connection) {
                if (err) {
                    res.set('Content-Type', 'application/JSON');
                    res.status(500).json({ status: 500,
                        message: "Error connecting to db",
                        detailed_message: err.message });
                    return;
                }
                connection.execute("SELECT * FROM USUARIO WHERE correo=:correo", {
                    correo: pcorreo
                }, {
                    outFormat: oracledb_1.default.OUT_FORMAT_OBJECT
                }, function (err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/JSON');
                        res.status(500).json({ status: 500,
                            message: "Error using db",
                            detailed_message: err.message });
                        return;
                    }
                    else {
                        res.header('Access-Control-Allow-Origin', '*');
                        res.header('Access-Control-Allow-Headers', 'Content-Type');
                        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                        res.contentType('application/json').status(200);
                        res.json(result.rows);
                        console.log(result.rows);
                    }
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                            console.log('No se pudo ejecutar delete');
                        }
                        else {
                            console.log("POST /api/GetUser : Connection released");
                        }
                    });
                });
            });
        });
    }
    uploadFile(req, res) {
        const file = req.file;
        console.log(file.filename);
        if (!file) {
            return;
        }
        res.send(file);
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var pnombre = req.body.nombre;
            var papellidos = req.body.apellidos;
            var pcorreo = req.body.correo;
            var pcontrasena = req.body.contrasena;
            var ptelefono = req.body.telefono;
            var pdireccion = req.body.direccion;
            var pfecha = req.body.fecha;
            var pgenero = req.body.genero;
            var prol = req.body.rol;
            var pcredito = req.body.credito;
            var pfoto = req.body.pathFoto;
            yield oracledb_1.default.getConnection(connAttrs, function (err, connection) {
                if (err) {
                    res.set('Content-Type', 'application/JSON');
                    res.status(500).json({ status: 500,
                        message: "Error connecting to db",
                        detailed_message: err.message });
                    return;
                }
                connection.execute('INSERT INTO usuario (nombre,apellidos,contrasena,correo,telefono,fotografia,fecha_nac,fecha_creacion,direccion,credito,ganancia,id_genero,id_rol,estado) VALUES(:nombre,:apellidos,:contrasena,:correo,:telefono,:foto,TO_DATE(:fecha,\'YYYY-MM-DD\'),CURRENT_TIMESTAMP,:direccion,:credito,0,:genero,:rol,0)', {
                    nombre: pnombre,
                    apellidos: papellidos,
                    contrasena: pcontrasena,
                    correo: pcorreo,
                    telefono: ptelefono,
                    foto: pfoto,
                    fecha: pfecha,
                    direccion: pdireccion,
                    credito: pcredito,
                    genero: pgenero,
                    rol: prol
                }, {
                    autoCommit: true,
                    outFormat: oracledb_1.default.OUT_FORMAT_OBJECT
                }, function (err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/JSON');
                        res.status(500).json({ status: 500,
                            message: "Error using db",
                            detailed_message: err.message });
                        console.log(err.message);
                        return;
                    }
                    else {
                        res.header('Access-Control-Allow-Origin', '*');
                        res.header('Access-Control-Allow-Headers', 'Content-Type');
                        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                        res.contentType('application/json').status(200);
                        res.json("1");
                    }
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                            console.log('no se ejecutaron tus nalgas');
                        }
                        else {
                            console.log("POST /api/addUser : Connection released");
                        }
                    });
                });
            });
        });
    }
    verifyUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var pcorreo = req.body.correo;
            var pcontrasena = req.body.contrasena;
            yield oracledb_1.default.getConnection(connAttrs, function (err, connection) {
                if (err) {
                    res.set('Content-Type', 'application/JSON');
                    res.status(500).json({ status: 500,
                        message: "Error connecting to db",
                        detailed_message: err.message });
                    return;
                }
                connection.execute("SELECT * FROM USUARIO WHERE correo=:correo AND contrasena=:contrasena", {
                    correo: pcorreo,
                    contrasena: pcontrasena
                }, {
                    outFormat: oracledb_1.default.OUT_FORMAT_OBJECT
                }, function (err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/JSON');
                        res.status(500).json({ status: 500,
                            message: "Error using db",
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
const mainPageController = new AllController;
exports.default = mainPageController;
