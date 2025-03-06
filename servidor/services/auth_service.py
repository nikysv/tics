from models import get_db_connection
from utils.security import hash_password
from flask_jwt_extended import create_access_token

def register_user(nombre, correo, password):
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT id FROM usuarios WHERE correo = %s", (correo,))
    if cursor.fetchone():
        return {"error": "El correo ya está registrado"}, 400

    hashed_password = hash_password(password)
    cursor.execute("INSERT INTO usuarios (nombre, correo, contraseña) VALUES (%s, %s, %s)",
                   (nombre, correo, hashed_password))
    db.commit()

    cursor.execute("SELECT id, nombre, correo FROM usuarios WHERE correo = %s", (correo,))
    user = cursor.fetchone()
    access_token = create_access_token(identity=str(user["id"]))

    return {"token": access_token, "user": user}, 201
