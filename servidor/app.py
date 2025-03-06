from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import mysql.connector
import datetime
import hashlib
import os
import fitz

# Configurar Flask
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}) # Permitir acceso desde React

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



# 🔹 Actualizar datos del usuario
@app.route("/perfil", methods=["PUT"])
@jwt_required()
def actualizar_perfil():
    user_id = get_jwt_identity()
    data = request.json
    nuevo_nombre = data.get("nombre")
    nuevo_correo = data.get("correo")

    if not nuevo_nombre or not nuevo_correo:
        return jsonify({"error": "Nombre y correo son obligatorios"}), 400

    cursor.execute("UPDATE usuarios SET nombre = %s, correo = %s WHERE id = %s", 
                   (nuevo_nombre, nuevo_correo, user_id))
    db.commit()

    return jsonify({"message": "Perfil actualizado exitosamente"}), 200



# Carpeta donde se guardarán los documentos
UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
PROCESSED_FOLDER = os.path.join(os.getcwd(), "processed_pdfs")
os.makedirs(PROCESSED_FOLDER, exist_ok=True)



# 🔹 Endpoint para subir un documento
@app.route("/upload", methods=["POST"])
@jwt_required()
def upload_document():
    try:
        user_id = get_jwt_identity()
        title = request.form.get("title")
        file = request.files.get("file")

        if not title or not file:
            return jsonify({"error": "Título y archivo son obligatorios"}), 400
        
        # Validar que el archivo sea un PDF
        if not file.filename.endswith(".pdf"):
            return jsonify({"error": "Solo se permiten archivos PDF"}), 400

        # 📂 Guardar el archivo en "uploads/" con modo binario (`wb`)
        filename = file.filename.replace(" ", "_")  # 🔹 Evita espacios en el nombre
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(file_path)

        # 📝 Guardar en la base de datos
        cursor.execute("INSERT INTO documento (usuario_id, titulo, documento) VALUES (%s, %s, %s)", 
                       (user_id, title, filename))
        db.commit()

        return jsonify({"message": "Documento guardado correctamente", "file_name": filename}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500



# 🔹 Endpoint para obtener la lista de documentos
@app.route("/documentos", methods=["GET"])
@jwt_required()
def get_documents():
    try:
        user_id = get_jwt_identity()
        cursor.execute("SELECT id, titulo, documento FROM documento WHERE usuario_id = %s", (user_id,))
        documents = cursor.fetchall()

        return jsonify(documents), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500



# 📌 Endpoint para extraer páginas del PDF y devolverlas como imágenes
@app.route("/documento/<titulo>", methods=["GET"])
@jwt_required()
def get_document(titulo):
    try:
        user_id = get_jwt_identity()
        cursor.execute("SELECT documento FROM documento WHERE usuario_id = %s AND titulo = %s", (user_id, titulo))
        document = cursor.fetchone()

        if not document:
            return jsonify({"error": "Documento no encontrado"}), 404

        pdf_path = os.path.join(UPLOAD_FOLDER, document["documento"])
        output_dir = os.path.join(PROCESSED_FOLDER, document["documento"].split(".")[0])

        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
            doc = fitz.open(pdf_path)
            for i, page in enumerate(doc):
                pix = page.get_pixmap()
                image_path = os.path.join(output_dir, f"pagina_{i+1}.png")
                pix.save(image_path)

        paginas = sorted(os.listdir(output_dir))
        return jsonify({
            "titulo": titulo,
            "files": [f"processed_pdfs/{document['documento'].split('.')[0]}/{p}" for p in paginas]
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 📌 Endpoint corregido para servir imágenes de las páginas del PDF
@app.route("/processed_pdfs/<folder>/<filename>", methods=["GET"])
def serve_processed_pdf(folder, filename):
    folder_path = os.path.join(PROCESSED_FOLDER, folder)  # 🔹 Ruta completa de la carpeta
    return send_from_directory(folder_path, filename, mimetype="image/png")

# Ejecutar servidor
if __name__ == "__main__":
    app.run(debug=True)