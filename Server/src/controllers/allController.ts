import {Request,Response} from 'express';
import oracledb from 'oracledb';
import nodemailer from 'nodemailer';
import sendTransporter from 'nodemailer-sendgrid-transport';
import { request } from 'http';

const transporter = nodemailer.createTransport(sendTransporter({
    auth:{
        api_key:'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'
    }
}
));

var connAttrs = {
    "user": "inti",
    "password": "qwer1234",
    "connectString": "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"
}
class AllController{
    public async getUser(req:Request,res:Response){
        var pcorreo = req.body.correo;
        await oracledb.getConnection(connAttrs,function(err,connection){
            if(err){
                res.set('Content-Type','application/JSON');
                res.status(500).json({status:500,
                message:"Error connecting to db",
                detailed_message:err.message})
                return;
            }
            connection.execute("SELECT * FROM USUARIO WHERE correo=:correo",{
                correo:pcorreo
            },
            {
                outFormat:oracledb.OUT_FORMAT_OBJECT
            },
            function(err,result){
                if(err){
                    res.set('Content-Type','application/JSON');
                    res.status(500).json({status:500,
                    message:"Error using db",
                    detailed_message:err.message})
                    return;
                }else{
                    res.header('Access-Control-Allow-Origin','*');
                    res.header('Access-Control-Allow-Headers','Content-Type');
                    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                    res.contentType('application/json').status(200);
                    res.json(result.rows);
                    console.log(result.rows);
                }
                connection.release(function(err){
                    if(err){
                        console.error(err.message);
                        console.log('No se pudo ejecutar delete');
                    }else{
                        console.log("POST /api/GetUser : Connection released");
                    }
                })
            })
        });
    }

    public  uploadFile(req:Request,res:Response){
        const file = req.file;
        console.log(file.filename);
        if (!file) {
            return;
        }
        res.send(file);
    }
    public deleteUser(req:Request,res:Response){
        
    }
    public async addUser(req:Request,res:Response){
        var pnombre = req.body.nombre;
        var papellidos= req.body.apellidos;
        var pcorreo= req.body.correo;
        var pcontrasena= req.body.contrasena;
        var ptelefono= req.body.telefono;
        var pdireccion= req.body.direccion;
        var pfecha= req.body.fecha;
        var pgenero= req.body.genero;
        var prol= req.body.rol;
        var pcredito= req.body.credito;
        var pfoto=req.body.pathFoto;
        await oracledb.getConnection(connAttrs,function(err,connection){
            if(err){
                res.set('Content-Type','application/JSON');
                res.status(500).json({status:500,
                message:"Error connecting to db",
                detailed_message:err.message})
                return;
            }
            connection.execute('INSERT INTO usuario (nombre,apellidos,contrasena,correo,telefono,fotografia,fecha_nac,fecha_creacion,direccion,credito,ganancia,id_genero,id_rol,estado) VALUES(:nombre,:apellidos,:contrasena,:correo,:telefono,:foto,TO_DATE(:fecha,\'YYYY-MM-DD\'),CURRENT_TIMESTAMP,:direccion,:credito,0,:genero,:rol,0)',{
                nombre:pnombre,
                apellidos:papellidos,
                contrasena:pcontrasena,
                correo:pcorreo,
                telefono:ptelefono,
                foto:pfoto,
                fecha:pfecha,
                direccion:pdireccion,
                credito:pcredito,
                genero:pgenero,
                rol:prol
            },
            {
                autoCommit:true,
                outFormat:oracledb.OUT_FORMAT_OBJECT
            },
            function(err,result){
                if(err){
                    res.set('Content-Type','application/JSON');
                    res.status(500).json({status:500,
                    message:"Error using db",
                    detailed_message:err.message})
                    console.log(err.message);
                    return;
                }else{
                    res.header('Access-Control-Allow-Origin','*');
                    res.header('Access-Control-Allow-Headers','Content-Type');
                    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                    res.contentType('application/json').status(200);
                    res.json("1");
                }
                connection.release(function(err){
                    if(err){
                        console.error(err.message);
                        console.log('no se ejecutaron tus nalgas');
                    }else{
                        console.log("POST /api/addUser : Connection released");
                    }
                })
            })
        });

    }
    public async verifyUser(req:Request,res:Response){
        var pcorreo = req.body.correo;
        var pcontrasena = req.body.contrasena;
        await oracledb.getConnection(connAttrs,function(err,connection){
            if(err){
                res.set('Content-Type','application/JSON');
                res.status(500).json({status:500,
                message:"Error connecting to db",
                detailed_message:err.message})
                return;
            }
            connection.execute("SELECT * FROM USUARIO WHERE correo=:correo AND contrasena=:contrasena",{
                correo:pcorreo,
                contrasena:pcontrasena
            },
            {
                outFormat:oracledb.OUT_FORMAT_OBJECT
            },
            function(err,result){
                if(err){
                    res.set('Content-Type','application/JSON');
                    res.status(500).json({status:500,
                    message:"Error using db",
                    detailed_message:err.message})
                    return;
                }else{
                    res.header('Access-Control-Allow-Origin','*');
                    res.header('Access-Control-Allow-Headers','Content-Type');
                    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                    res.contentType('application/json').status(200);
                    res.json(result.rows);
                }
                connection.release(function(err){
                    if(err){
                        console.error(err.message);
                        console.log('No se pudo ejecutar verifyuser');
                    }else{
                        console.log("GET /api/verifyuser : Connection released");
                    }
                })
            })
        });
    }
    public async updateUserPassword(req:Request,res:Response){
        var pcontrasena = req.body.contrasena;
        var pcorreo = req.body.correo;
        await oracledb.getConnection(connAttrs,function(err,connection){
            if(err){
                res.set('Content-Type','application/JSON');
                res.status(500).json({status:500,
                message:"Error connecting to db",
                detailed_message:err.message})
                return;
            }
            connection.execute("UPDATE USUARIO SET contrasena = :contrasena WHERE correo = :correo",{
                correo:pcorreo,
                contrasena:pcontrasena
            },
            {
                outFormat:oracledb.OUT_FORMAT_OBJECT,
                autoCommit:true
            },
            function(err,result){
                if(err){
                    res.set('Content-Type','application/JSON');
                    res.status(500).json({status:500,
                    message:"Error using db",
                    detailed_message:err.message})
                    return;
                }else{
                    res.header('Access-Control-Allow-Origin','*');
                    res.header('Access-Control-Allow-Headers','Content-Type');
                    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                    res.contentType('application/json').status(200);
                    res.json(result.rows);
                }
                connection.release(function(err){
                    if(err){
                        console.error(err.message);
                        console.log('No se pudo ejecutar update');
                    }else{
                        console.log("POST /Update : Connection released");
                    }
                })
            })
        });
    }

    public async addProduct(req:Request,res:Response){
        var pnombre = req.body.nombre;
        var pdescripcion = req.body.descripcion;
        var ppathFoto = req.body.pathFoto;
        var pusuario = req.body.usuario;
        var pcategoria = req.body.categoria;
        var pprecio = req.body.precio;
        var pcantidad =  req.body.cantidad;
        await oracledb.getConnection(connAttrs,function(err,connection){
            if(err){
                res.set('Content-Type','application/JSON');
                res.status(500).json({status:500,
                message:"Error connecting to db",
                detailed_message:err.message})
                return;
            }
            connection.execute('INSERT INTO producto (nombre,descripcion,imagen,id_usuario,id_categoria,precio,cantidad_disponible,fecha_carga) VALUES(:nombre,:descripcion,:imagen,:id_usuario,:id_categoria,:precio,:cantidad_disponible,CURRENT_TIMESTAMP)',{
                nombre:pnombre,
                descripcion:pdescripcion,
                imagen:ppathFoto,
                id_usuario:pusuario,
                id_categoria:pcategoria,
                precio:pprecio,
                cantidad_disponible:pcantidad
            },
            {
                autoCommit:true,
                outFormat:oracledb.OUT_FORMAT_OBJECT
            },
            function(err,result){
                if(err){
                    res.set('Content-Type','application/JSON');
                    res.status(500).json({status:500,
                    message:"Error using db",
                    detailed_message:err.message})
                    console.log(err.message);
                    return;
                }else{
                    res.header('Access-Control-Allow-Origin','*');
                    res.header('Access-Control-Allow-Headers','Content-Type');
                    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                    res.contentType('application/json').status(200);
                    res.json("1");
                }
                connection.release(function(err){
                    if(err){
                        console.error(err.message);
                        console.log('no se ejecutaron tus nalgas');
                    }else{
                        console.log("POST /api/addProduct : Connection released");
                    }
                })
            })
        });

    }
    public async buscarProductos(req:Request,res:Response){
        var psearch = req.body.search;
        psearch= "%"+psearch+"%";
        await oracledb.getConnection(connAttrs,function(err,connection){
            if(err){
                res.set('Content-Type','application/JSON');
                res.status(500).json({status:500,
                message:"Error connecting to db",
                detailed_message:err.message})
                return;
            }
            connection.execute("SELECT * FROM PRODUCTO WHERE nombre LIKE :search",{
                search:psearch
            },
            {
                outFormat:oracledb.OUT_FORMAT_OBJECT,
                autoCommit:true
            },
            function(err,result){
                if(err){
                    res.set('Content-Type','application/JSON');
                    res.status(500).json({status:500,
                    message:"Error using db",
                    detailed_message:err.message})
                    return;
                }else{
                    res.header('Access-Control-Allow-Origin','*');
                    res.header('Access-Control-Allow-Headers','Content-Type');
                    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                    res.contentType('application/json').status(200);
                    res.json(result.rows);
                }
                connection.release(function(err){
                    if(err){
                        console.error(err.message);
                        console.log('No se pudo ejecutar buscqueda');
                    }else{
                        console.log("POST /buscarProductos : Connection released");
                    }
                })
            })
        });
    }
    public async addCategoria(req:Request,res:Response){
        var pnombre = req.body.nombre;
        var pdescripcion = req.body.descripcion;
        var ppadre = req.body.padre;
        
        await oracledb.getConnection(connAttrs,function(err,connection){
            if(err){
                res.set('Content-Type','application/JSON');
                res.status(500).json({status:500,
                message:"Error connecting to db",
                detailed_message:err.message})
                return;
            }
            connection.execute('INSERT INTO categoria (nombre,descripcion,id_categoria_padre) VALUES(:nombre,:descripcion,:id_categoria_padre)',{
                nombre:pnombre,
                descripcion:pdescripcion,
                id_categoria_padre:ppadre,
                
            },
            {
                autoCommit:true,
                outFormat:oracledb.OUT_FORMAT_OBJECT
            },
            function(err,result){
                if(err){
                    res.set('Content-Type','application/JSON');
                    res.status(500).json({status:500,
                    message:"Error using db",
                    detailed_message:err.message})
                    console.log(err.message);
                    return;
                }else{
                    res.header('Access-Control-Allow-Origin','*');
                    res.header('Access-Control-Allow-Headers','Content-Type');
                    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                    res.contentType('application/json').status(200);
                    res.json("1");
                }
                connection.release(function(err){
                    if(err){
                        console.error(err.message);
                        console.log('no se ejecutaron tus nalgas');
                    }else{
                        console.log("POST /api/addCategoria : Connection released");
                    }
                })
            })
        });
 
    }
    public sendMail(req:Request,res:Response){
        console.log(req.body);
        try{
            transporter.sendMail({
                
                to:req.body.correo,
                from:'intirocks888@gmail.com',
                subject:'confirmacion',
                html:'<h1>'+req.body.contrasena +'</h1><a href="http://localhost:4200/login">Login</a>' 
                
            }); 
            console.log('SEND /sendmail released');
            res.json({message:"done"});
            return(res.status(200));
        }catch(err){
            console.error(err);
            return ;
        }
    }
}

const mainPageController = new AllController;
export default  mainPageController;