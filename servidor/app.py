from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import mysql.connector
import datetime
import hashlib

# Configurar Flask
app = Flask(__name__)
CORS(app)  # Permitir acceso desde React
app.config["JWT_SECRET_KEY"] = "ZpVhYb2Y*"
jwt = JWTManager(app)

# Conectar con MySQL
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="mysql",
    database="tics"
)
cursor = db.cursor(dictionary=True)

# 📝 Ruta de prueba
@app.route("/")
def home():
    return jsonify({"message": "API funcionando"}), 200

# Función para hashear contraseñas con hashlib
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# 🔹 Endpoint para registrar usuario
@app.route("/register", methods=["POST"])
def register():
    data = request.json
    nombre = data.get("name")
    correo = data.get("email")
    password = data.get("password")

    if not nombre or not correo or not password:
        return jsonify({"error": "Todos los campos son obligatorios"}), 400

    # Verificar si el usuario ya existe
    cursor.execute("SELECT id FROM usuarios WHERE correo = %s", (correo,))
    if cursor.fetchone():
        return jsonify({"error": "El correo ya está registrado"}), 400

    # Hashear la contraseña antes de guardarla
    hashed_password = hash_password(password)

    # Insertar en la base de datos
    fecha_registro = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    cursor.execute("INSERT INTO usuarios (nombre, correo, contraseña, fecha_registro) VALUES (%s, %s, %s, %s)",
                   (nombre, correo, hashed_password, fecha_registro))
    db.commit()

    # Crear un token de acceso inmediato
    cursor.execute("SELECT id, nombre, correo FROM usuarios WHERE correo = %s", (correo,))
    user = cursor.fetchone()
    access_token = create_access_token(identity=str(user["id"]))

    return jsonify({"token": access_token, "user": user}), 201

# 🔹 Endpoint para iniciar sesión
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    correo = data.get("email")
    password = data.get("password")

    if not correo or not password:
        return jsonify({"error": "Correo y contraseña requeridos"}), 400

    cursor.execute("SELECT * FROM usuarios WHERE correo=%s", (correo,))
    user = cursor.fetchone()

    if user and user["contraseña"] == hash_password(password):  # Comparar hash
        access_token = create_access_token(identity=str(user["id"]))
        return jsonify({"token": access_token, "user": {"id": user["id"], "nombre": user["nombre"], "correo": user["correo"]}}), 200

    return jsonify({"error": "Credenciales incorrectas"}), 401

# 🔒 Ruta protegida
@app.route("/perfil", methods=["GET"])
@jwt_required()
def perfil():
    try:
        user_id = get_jwt_identity()  # Obtener ID del usuario desde el token
        cursor.execute("SELECT id, nombre, correo, imagen, fecha_registro FROM usuarios WHERE id=%s", (user_id,))
        user = cursor.fetchone()

        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404

        return jsonify(user), 200
    except Exception as e:
        return jsonify({"error": "Error obteniendo perfil"}), 500


if __name__ == "__main__":
    app.run(debug=True)
