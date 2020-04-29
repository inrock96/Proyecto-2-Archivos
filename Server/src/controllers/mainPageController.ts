import {Request,Response} from 'express';
import oracledb from 'oracledb';

var connAttrs = {
    "user": "inti",
    "password": "qwer1234",
    "connectString": "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"
}

class MainPageController{
    public async getMainPage(req:Request,res:Response){
        
        await oracledb.getConnection(connAttrs,function(err,connection){
            if(err){
                res.set('Content-Type','application/JSON');
                res.status(500).json({status:500,
                message:"Error connecting to db",
                detailed_message:err.message})
                return;
            }
            connection.execute("SELECT * FROM pagina_inicio",{},
            {
                outFormat:oracledb.OUT_FORMAT_OBJECT
            },
            function(err,result){
                if(err){
                    res.set('Content-Type','application/JSON');
                    res.status(500).json({status:500,
                    message:"Error using to db",
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
                        console.log('No se pudo ejecutar delete');
                    }else{
                        console.log("GET /home : Connection released");
                    }
                })
            })
        });
    }
}

const mainPageController = new MainPageController;
export default  mainPageController;