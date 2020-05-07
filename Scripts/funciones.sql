CREATE OR REPLACE FUNCTION validar_login(
    p_correo IN VARCHAR2, p_contrasena IN VARCHAR2
) 
RETURN NUMBER
IS
    retorno NUMBER := 0;
BEGIN
    SELECT SUM(id_usuario)
    INTO retorno
    FROM USUARIO
    WHERE CORREO = p_correo
    AND CONTRASENA=p_contrasena;
    IF retorno IS NULL THEN
    RETURN 0;
    ELSE
    RETURN retorno;
    END IF;
END;


