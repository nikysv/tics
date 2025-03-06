from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from models import get_db_connection
from utils.security import hash_password
from services.auth_service import register_user

auth_routes = Blueprint("auth_routes", __name__)

# ✅ Ruta para registrar usuario
@auth_routes.route("/register", methods=["POST"])
def register():
    data = request.json
    nombre = data.get("name")
    correo = data.get("email")
    password = data.get("password")

    if not nombre or not correo or not password:
        return jsonify({"error": "Todos los campos son obligatorios"}), 400

    response, status = register_user(nombre, correo, password)
    return jsonify(response), status

# ✅ Ruta para iniciar sesión
@auth_routes.route("/login", methods=["POST"])
def login():
    data = request.json
    correo = data.get("email")
    password = data.get("password")

    if not correo or not password:
        return jsonify({"error": "Correo y contraseña requeridos"}), 400

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuarios WHERE correo=%s", (correo,))
    user = cursor.fetchone()

    if user and user["contraseña"] == hash_password(password):
        access_token = create_access_token(identity=str(user["id"]))
        return jsonify({"token": access_token, "user": {"id": user["id"], "nombre": user["nombre"], "correo": user["correo"]}}), 200

    return jsonify({"error": "Credenciales incorrectas"}), 401
