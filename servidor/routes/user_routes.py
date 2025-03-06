from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import get_db_connection

user_routes = Blueprint("user_routes", __name__)

@user_routes.route("/perfil", methods=["GET"])
@jwt_required()
def perfil():
    user_id = get_jwt_identity()
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT id, nombre, correo, imagen, fecha_registro FROM usuarios WHERE id=%s", (user_id,))
    user = cursor.fetchone()

    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    return jsonify(user), 200

@user_routes.route("/perfil", methods=["PUT"])
@jwt_required()
def actualizar_perfil():
    user_id = get_jwt_identity()
    data = request.json
    nuevo_nombre = data.get("nombre")
    nuevo_correo = data.get("correo")

    if not nuevo_nombre or not nuevo_correo:
        return jsonify({"error": "Nombre y correo son obligatorios"}), 400

    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("UPDATE usuarios SET nombre = %s, correo = %s WHERE id = %s", 
                   (nuevo_nombre, nuevo_correo, user_id))
    db.commit()

    return jsonify({"message": "Perfil actualizado exitosamente"}), 200
