INSERT INTO Rol values(1,'ADMIN','ADMINISTRADOR DEL SITIO');
INSERT INTO Rol values(2,'SERVICIO AYUDA','CLIENTE CON ACCESO A DAR SERVICIO DE ATENCION AL CLIENTE');
INSERT INTO Rol values(3,'CLIENTE','TODA PERSONA QUE QUIERA COMPRAR O VENDER PRODUCTOS'); 

INSERT INTO Genero values(1,'Masculino');
INSERT INTO Genero values(2,'Femenino');
INSERT INTO Genero values(3,'Otro'); 

INSERT INTO Color values(1,'azul');
INSERT INTO Color values(2,'rojo');
INSERT INTO Color values(3,'amarillo'); 
INSERT INTO Color values(4,'verde');
INSERT INTO Color values(5,'naranja');
INSERT INTO Color values(6,'morado'); 
INSERT INTO Color values(7,'blanco');
INSERT INTO Color values(8,'negro');

INSERT INTO usuario (
nombre,
apellidos,
contrasena,
correo,
telefono,
fotografia,
fecha_nac,
fecha_creacion,
direccion,
credito,
ganancia,
id_genero,
id_rol,
estado
)
values(
'Inti',
'Samayoa Ortíz',
'contra1234',
'intirocks888@gmail.com',
54258998,
NULL,
TO_DATE('1996-05-20','YYYY-MM-DD'),
CURRENT_TIMESTAMP,
'14 av 11-16 Zona 2',
500000,
0,
1,
1,
0
);
