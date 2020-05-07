CREATE SEQUENCE bitacora_seq minvalue 1 start with 1 CACHE 10;

CREATE TRIGGER  bitacora_insert
BEFORE INSERT ON bitacora
FOR EACH ROW
BEGIN
  SELECT bitacora_seq.nextval
  INTO :new.id_bitacora
  FROM dual;
END;

CREATE SEQUENCE usuario_seq minvalue 1 start with 1 CACHE 10;

CREATE TRIGGER  usuario_insert
BEFORE INSERT ON usuario
FOR EACH ROW
BEGIN
  SELECT usuario_seq.nextval
  INTO :new.id_usuario
  FROM dual;
END;

CREATE SEQUENCE categoria_seq minvalue 1 start with 1 CACHE 10;

CREATE TRIGGER  categoria_insert
BEFORE INSERT ON categoria
FOR EACH ROW
BEGIN
  SELECT categoria_seq.nextval
  INTO :new.id_categoria
  FROM dual;
END;

CREATE SEQUENCE producto_seq minvalue 1 start with 1 CACHE 10;

CREATE TRIGGER  producto_insert
BEFORE INSERT ON producto
FOR EACH ROW
BEGIN
  SELECT producto_seq.nextval
  INTO :new.id_producto
  FROM dual;
END;


CREATE SEQUENCE comentario_seq minvalue 1 start with 1 CACHE 10;

CREATE TRIGGER  comentario_insert
BEFORE INSERT ON comentario
FOR EACH ROW
BEGIN
  SELECT comentario_seq.nextval
  INTO :new.id_comentario
  FROM dual;
END;

CREATE SEQUENCE carrito_seq minvalue 1 start with 1 CACHE 10;

CREATE TRIGGER  carrito_insert
BEFORE INSERT ON carro_compras
FOR EACH ROW
BEGIN
  SELECT carrito_seq.nextval
  INTO :new.id_carrito
  FROM dual;
END;


CREATE SEQUENCE mensaje_seq minvalue 1 start with 1 CACHE 10;

CREATE TRIGGER  mensaje_insert
BEFORE INSERT ON mensaje
FOR EACH ROW
BEGIN
  SELECT mensaje_seq.nextval
  INTO :new.id_mensaje
  FROM dual;
END;