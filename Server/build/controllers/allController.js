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
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_sendgrid_transport_1 = __importDefault(require("nodemailer-sendgrid-transport"));
const transporter = nodemailer_1.default.createTransport(nodemailer_sendgrid_transport_1.default({
    auth: {
        api_key: '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'
    }
}));
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
    deleteUser(req, res) {
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
                            console.log('No se pudo ejecutar verifyuser');
                        }
                        else {
                            console.log("GET /api/verifyuser : Connection released");
                        }
                    });
                });
            });
        });
    }
    updateUserPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var pcontrasena = req.body.contrasena;
            var pcorreo = req.body.correo;
            yield oracledb_1.default.getConnection(connAttrs, function (err, connection) {
                if (err) {
                    res.set('Content-Type', 'application/JSON');
                    res.status(500).json({ status: 500,
                        message: "Error connecting to db",
                        detailed_message: err.message });
                    return;
                }
                connection.execute("UPDATE USUARIO SET contrasena = :contrasena WHERE correo = :correo", {
                    correo: pcorreo,
                    contrasena: pcontrasena
                }, {
                    outFormat: oracledb_1.default.OUT_FORMAT_OBJECT,
                    autoCommit: true
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
                            console.log('No se pudo ejecutar update');
                        }
                        else {
                            console.log("POST /Update : Connection released");
                        }
                    });
                });
            });
        });
    }
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var pnombre = req.body.nombre;
            var pdescripcion = req.body.descripcion;
            var ppathFoto = req.body.pathFoto;
            var pusuario = req.body.usuario;
            var pcategoria = req.body.categoria;
            var pprecio = req.body.precio;
            var pcantidad = req.body.cantidad;
            yield oracledb_1.default.getConnection(connAttrs, function (err, connection) {
                if (err) {
                    res.set('Content-Type', 'application/JSON');
                    res.status(500).json({ status: 500,
                        message: "Error connecting to db",
                        detailed_message: err.message });
                    return;
                }
                connection.execute('INSERT INTO producto (nombre,descripcion,imagen,id_usuario,id_categoria,precio,cantidad_disponible,fecha_carga) VALUES(:nombre,:descripcion,:imagen,:id_usuario,:id_categoria,:precio,:cantidad_disponible,CURRENT_TIMESTAMP)', {
                    nombre: pnombre,
                    descripcion: pdescripcion,
                    imagen: ppathFoto,
                    id_usuario: pusuario,
                    id_categoria: pcategoria,
                    precio: pprecio,
                    cantidad_disponible: pcantidad
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
                            console.log("POST /api/addProduct : Connection released");
                        }
                    });
                });
            });
        });
    }
    buscarProductos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var psearch = req.body.search;
            var porden = req.body.orden;
            var ptipo = req.body.tipo;
            psearch = "%" + psearch + "%";
            if (porden === 1 && ptipo === 1) {
                yield oracledb_1.default.getConnection(connAttrs, function (err, connection) {
                    if (err) {
                        res.set('Content-Type', 'application/JSON');
                        res.status(500).json({ status: 500,
                            message: "Error connecting to db",
                            detailed_message: err.message });
                        return;
                    }
                    connection.execute("SELECT * FROM PRODUCTO WHERE nombre LIKE :search ORDER BY fecha_carga ASC", {
                        search: psearch
                    }, {
                        outFormat: oracledb_1.default.OUT_FORMAT_OBJECT,
                        autoCommit: true
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
                                console.log('No se pudo ejecutar buscqueda');
                            }
                            else {
                                console.log("POST /buscarProductos : Connection released");
                            }
                        });
                    });
                });
            }
            else if (porden === 1 && ptipo === 2) {
                yield oracledb_1.default.getConnection(connAttrs, function (err, connection) {
                    if (err) {
                        res.set('Content-Type', 'application/JSON');
                        res.status(500).json({ status: 500,
                            message: "Error connecting to db",
                            detailed_message: err.message });
                        return;
                    }
                    connection.execute("SELECT * FROM PRODUCTO WHERE nombre LIKE :search ORDER BY precio ASC", {
                        search: psearch
                    }, {
                        outFormat: oracledb_1.default.OUT_FORMAT_OBJECT,
                        autoCommit: true
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
                                console.log('No se pudo ejecutar buscqueda');
                            }
                            else {
                                console.log("POST /buscarProductos : Connection released");
                            }
                        });
                    });
                });
            }
            else if (porden === 2 && ptipo === 1) {
                yield oracledb_1.default.getConnection(connAttrs, function (err, connection) {
                    if (err) {
                        res.set('Content-Type', 'application/JSON');
                        res.status(500).json({ status: 500,
                            message: "Error connecting to db",
                            detailed_message: err.message });
                        return;
                    }
                    connection.execute("SELECT * FROM PRODUCTO WHERE nombre LIKE :search ORDER BY fecha_carga DESC", {
                        search: psearch
                    }, {
                        outFormat: oracledb_1.default.OUT_FORMAT_OBJECT,
                        autoCommit: true
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
                                console.log('No se pudo ejecutar buscqueda');
                            }
                            else {
                                console.log("POST /buscarProductos : Connection released");
                            }
                        });
                    });
                });
            }
            else {
                yield oracledb_1.default.getConnection(connAttrs, function (err, connection) {
                    if (err) {
                        res.set('Content-Type', 'application/JSON');
                        res.status(500).json({ status: 500,
                            message: "Error connecting to db",
                            detailed_message: err.message });
                        return;
                    }
                    connection.execute("SELECT * FROM PRODUCTO WHERE nombre LIKE :search ORDER BY precio DESC", {
                        search: psearch
                    }, {
                        outFormat: oracledb_1.default.OUT_FORMAT_OBJECT,
                        autoCommit: true
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
                                console.log('No se pudo ejecutar buscqueda');
                            }
                            else {
                                console.log("POST /buscarProductos : Connection released");
                            }
                        });
                    });
                });
            }
        });
    }
    getCategoria(req, res) {
        var pnombre = req.body.nombre;
        oracledb_1.default.getConnection(connAttrs, function (err, connection) {
            if (err) {
                res.set('Content-Type', 'application/JSON');
                res.status(500).json({ status: 500,
                    message: "Error connecting to db",
                    detailed_message: err.message });
                return;
            }
            connection.execute('SELECT * FROM CATEGORIA WHERE nombre=:nombre', {
                nombre: pnombre
            }, {
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
                    res.json(result.rows);
                }
                connection.release(function (err) {
                    if (err) {
                        console.error(err.message);
                        console.log('no se ejecutaron tus nalgas');
                    }
                    else {
                        console.log("GET /api/getCategoria : Connection released");
                    }
                });
            });
        });
    }
    getCategorias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield oracledb_1.default.getConnection(connAttrs, function (err, connection) {
                if (err) {
                    res.set('Content-Type', 'application/JSON');
                    res.status(500).json({ status: 500,
                        message: "Error connecting to db",
                        detailed_message: err.message });
                    return;
                }
                connection.execute('SELECT c2.id_categoria, c1.nombre AS padre,c2.nombre FROM CATEGORIA c1 RIGHT JOIN CATEGORIA c2 on c1.ID_CATEGORIA=c2.ID_CATEGORIA_PADRE', {}, {
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
                        res.json(result.rows);
                    }
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                            console.log('no se ejecutaron tus nalgas');
                        }
                        else {
                            console.log("GET /api/getCategoria : Connection released");
                        }
                    });
                });
            });
        });
    }
    addCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var pnombre = req.body.nombre;
            var pdescripcion = req.body.descripcion;
            var ppadre = req.body.padre;
            if (req.body.padre != "null") {
                yield oracledb_1.default.getConnection(connAttrs, function (err, connection) {
                    if (err) {
                        res.set('Content-Type', 'application/JSON');
                        res.status(500).json({ status: 500,
                            message: "Error connecting to db",
                            detailed_message: err.message });
                        return;
                    }
                    connection.execute('INSERT INTO categoria (nombre,descripcion,id_categoria_padre) VALUES(:nombre,:descripcion,:id_categoria_padre)', {
                        nombre: pnombre,
                        descripcion: pdescripcion,
                        id_categoria_padre: ppadre,
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
                                console.log("POST /api/addCategoria : Connection released");
                            }
                        });
                    });
                });
            }
            else {
                yield oracledb_1.default.getConnection(connAttrs, function (err, connection) {
                    if (err) {
                        res.set('Content-Type', 'application/JSON');
                        res.status(500).json({ status: 500,
                            message: "Error connecting to db",
                            detailed_message: err.message });
                        return;
                    }
                    connection.execute('INSERT INTO categoria (nombre,descripcion) VALUES(:nombre,:descripcion)', {
                        nombre: pnombre,
                        descripcion: pdescripcion,
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
                                console.log("POST /api/addCategoria : Connection released");
                            }
                        });
                    });
                });
            }
        });
    }
    getColores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield oracledb_1.default.getConnection(connAttrs, function (err, connection) {
                if (err) {
                    res.set('Content-Type', 'application/JSON');
                    res.status(500).json({ status: 500,
                        message: "Error connecting to db",
                        detailed_message: err.message });
                    return;
                }
                connection.execute('SELECT * FROM COLOR', {}, {
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
                        res.json(result.rows);
                    }
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                            console.log('no se ejecutaron tus nalgas');
                        }
                        else {
                            console.log("GET /api/getColores : Connection released");
                        }
                    });
                });
            });
        });
    }
    reporte1(req, res) {
    }
    reporte2(req, res) {
    }
    reporte3(req, res) {
    }
    reporte4(req, res) {
    }
    reporte5(req, res) {
    }
    reporte6(req, res) {
    }
    reporte7(req, res) {
    }
    reporte8(req, res) {
    }
    reporte9(req, res) {
    }
    reporte10(req, res) {
    }
    sendMail(req, res) {
        console.log(req.body);
        try {
            transporter.sendMail({
                to: req.body.correo,
                from: 'intirocks888@gmail.com',
                subject: 'confirmacion',
                html: '<h1>' + req.body.contrasena + '</h1><a href="http://localhost:4200/login">Login</a>'
            });
            console.log('SEND /sendmail released');
            res.json({ message: "done" });
            return (res.status(200));
        }
        catch (err) {
            console.error(err);
            return;
        }
    }
}
const mainPageController = new AllController;
exports.default = mainPageController;
