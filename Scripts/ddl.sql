CREATE TABLE bitacora (
    id_bitacora   INTEGER NOT NULL,
    usuario       VARCHAR2(50),
    operacio      VARCHAR2(50),
    fecha         TIMESTAMP,
    CONSTRAINT pk_id_bitacora PRIMARY KEY ( id_bitacora )
);

CREATE TABLE pagina_inicio (
    id_pagina_inicio   INTEGER NOT NULL,
    nombre             VARCHAR2(50),
    eslogan            VARCHAR2(50),
    imagen             VARCHAR2(150),
    video              VARCHAR2(150),
    vision             VARCHAR2(255),
    mision             VARCHAR2(255),
    about              VARCHAR2(255),
    CONSTRAINT pk_id_pagina PRIMARY KEY ( id_pagina_inicio )
);

CREATE TABLE genero (
    id_genero   INTEGER NOT NULL,
    nombre      VARCHAR2(20) NOT NULL,
    CONSTRAINT genero_pk PRIMARY KEY ( id_genero )
);

CREATE TABLE color (
    id_color   INTEGER NOT NULL,
    nombre     VARCHAR2(25) NOT NULL,
    CONSTRAINT pk_id_color PRIMARY KEY ( id_color )
);

CREATE TABLE rol (
    id_rol        INTEGER NOT NULL,
    nombre        VARCHAR2(50) NOT NULL,
    descripcion   VARCHAR2(150),
    CONSTRAINT pk_id_rol PRIMARY KEY ( id_rol )
);

CREATE TABLE usuario (
    id_usuario         INTEGER NOT NULL,
    nombre             VARCHAR2(50) NOT NULL,
    apellidos          VARCHAR2(100) NOT NULL,
    contrasena         VARCHAR2(25) NOT NULL,
    correo             VARCHAR2(100) NOT NULL,
    telefono           INTEGER NOT NULL,
    fotografia         VARCHAR2(150),
    fecha_nac          DATE NOT NULL,
    fecha_creacion     TIMESTAMP NOT NULL,
    direccion          VARCHAR2(150) NOT NULL,
    credito            INTEGER NOT NULL,
    ganancia           INTEGER NOT NULL,
    id_genero          INTEGER NOT NULL,
    id_rol             INTEGER NOT NULL,
    estado             INTEGER,

    CONSTRAINT pk_id_usuario PRIMARY KEY ( id_usuario ),

    CONSTRAINT fk_usuario_genero FOREIGN KEY ( id_genero )
    REFERENCES genero ( id_genero ),

    CONSTRAINT fk_usuario_rol FOREIGN KEY ( id_rol )
    REFERENCES rol ( id_rol )
);

CREATE TABLE categoria (
    id_categoria             INTEGER NOT NULL,
    nombre                   VARCHAR2(32) NOT NULL,
    descripcion              VARCHAR(150),
    id_categoria_padre       INTEGER NOT NULL,
    CONSTRAINT pk_id_categoria PRIMARY KEY ( id_categoria )
);

ALTER TABLE categoria
ADD CONSTRAINT categoria_categoria_fk FOREIGN KEY ( id_categoria_padre )
REFERENCES categoria ( id_categoria );


CREATE TABLE producto (
    id_producto              INTEGER NOT NULL,
    imagen                   VARCHAR2(150) NOT NULL,
    descripcion              VARCHAR2(150),
    precio                   INTEGER NOT NULL,
    fecha_carga              TIMESTAMP NOT NULL,
    cantidad_disponible      INTEGER NOT NULL,
    id_categoria             INTEGER NOT NULL,
    CONSTRAINT pk_id_producto PRIMARY KEY ( id_producto ),
    CONSTRAINT fk_producto_categoria FOREIGN KEY ( id_categoria )
    REFERENCES categoria ( id_categoria )
);
CREATE TABLE colorxproducto (
    id_color         INTEGER NOT NULL,
    id_producto   INTEGER NOT NULL,
    CONSTRAINT pk_colorxproducto PRIMARY KEY ( id_color,id_producto ),
    CONSTRAINT fk_color_colorxproducto FOREIGN KEY ( id_color )
    REFERENCES color ( id_color ),
    CONSTRAINT fk_producto_colorxproducto FOREIGN KEY ( id_producto )
    REFERENCES producto ( id_producto )
);

CREATE TABLE comentario (
    id_comentario          INTEGER NOT NULL,
    contenido              VARCHAR2(255) NOT NULL,
    fecha                  TIMESTAMP NOT NULL,
    id_usuario             INTEGER NOT NULL,
    titulo                 VARCHAR2(25) NOT NULL,
    puntuacion             INTEGER NOT NULL,
    id_producto   INTEGER NOT NULL,
    CONSTRAINT pk_id_comentario PRIMARY KEY ( id_comentario ),
    CONSTRAINT fk_comentario_producto FOREIGN KEY ( id_producto )
    REFERENCES producto ( id_producto ),
    CONSTRAINT fk_comentario_usuario FOREIGN KEY ( id_usuario )
    REFERENCES usuario ( id_usuario )
);

CREATE TABLE carro_compras (
    id_carrito           INTEGER NOT NULL,
    id_usuario   INTEGER NOT NULL,
    total                INTEGER NOT NULL,
    CONSTRAINT pk_id_carrito PRIMARY KEY ( id_carrito ),
    CONSTRAINT fk_carro_usuario FOREIGN KEY ( id_usuario )
    REFERENCES usuario ( id_usuario )
);

CREATE TABLE detalle_carro_compras (
    id_producto       INTEGER NOT NULL,
    cantidad_producto          INTEGER NOT NULL,
    id_carrito   INTEGER NOT NULL,
    CONSTRAINT pk_detalle_carro_compras PRIMARY KEY ( id_producto,id_carrito ),
    CONSTRAINT fk_detalle_carr_id_carr FOREIGN KEY ( id_carrito )
    REFERENCES carro_compras ( id_carrito ),
    CONSTRAINT fk_detalle_carr_id_prod FOREIGN KEY ( id_producto )
    REFERENCES producto ( id_producto )
);

CREATE TABLE mensaje (
    id_usuario   INTEGER NOT NULL,
    id_mensaje           INTEGER NOT NULL,
    contenido            VARCHAR2(255) NOT NULL,
    CONSTRAINT pk_id_mensaje PRIMARY KEY ( id_mensaje ),
    CONSTRAINT fk_mensaje_usuario FOREIGN KEY ( id_usuario )
    REFERENCES usuario ( id_usuario )
);

CREATE TABLE conversacion (
    id_usuario            INTEGER NOT NULL,
    id_usuariocliente     INTEGER NOT NULL,
    puntuacion            INTEGER,
    CONSTRAINT conversacion_pk PRIMARY KEY ( id_usuario,id_usuariocliente ),
    CONSTRAINT fk_conver_usuario FOREIGN KEY ( id_usuario )
    REFERENCES usuario ( id_usuario ),
    CONSTRAINT fk_conver_usuario_cliente FOREIGN KEY ( id_usuariocliente )
    REFERENCES usuario ( id_usuario )
);

CREATE TABLE detalle_mensaje ( 
    id_usuario    INTEGER NOT NULL, 
    id_usuariocliente   INTEGER NOT NULL,
    id_mensaje           INTEGER NOT NULL,
    CONSTRAINT pk_detalle_mensaje PRIMARY KEY ( id_usuario,id_usuariocliente,id_mensaje ),
    CONSTRAINT fk_detalle_conver FOREIGN KEY ( id_usuario, id_usuariocliente )
    REFERENCES conversacion ( id_usuario,id_usuariocliente ),
    CONSTRAINT fk_detalle_mensaje FOREIGN KEY ( id_mensaje )
    REFERENCES mensaje ( id_mensaje )
);