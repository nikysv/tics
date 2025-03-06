import os
from models import get_db_connection
from config.config import Config
import fitz

def upload_document_service(user_id, title, file):
    if not title or not file:
        return {"error": "Título y archivo son obligatorios"}, 400

    if not file.filename.endswith(".pdf"):
        return {"error": "Solo se permiten archivos PDF"}, 400

    filename = file.filename.replace(" ", "_")
    file_path = os.path.join(Config.UPLOAD_FOLDER, filename)
    file.save(file_path)

    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("INSERT INTO documento (usuario_id, titulo, documento) VALUES (%s, %s, %s)", 
                   (user_id, title, filename))
    db.commit()

    return {"message": "Documento guardado correctamente", "file_name": filename}, 201

def get_documents_service(user_id):
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT id, titulo, documento FROM documento WHERE usuario_id = %s", (user_id,))
    documents = cursor.fetchall()

    return documents, 200

def get_document_service(user_id, titulo):
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        # Buscar el documento en la base de datos
        cursor.execute("SELECT documento FROM documento WHERE usuario_id = %s AND titulo = %s", (user_id, titulo))
        document = cursor.fetchone()

        if not document:
            return {"error": "Documento no encontrado"}, 404

        # Ruta del PDF en el sistema de archivos
        pdf_path = os.path.join(Config.UPLOAD_FOLDER, document["documento"])
        output_dir = os.path.join(Config.PROCESSED_FOLDER, document["documento"].split(".")[0])

        # Si no existen imágenes del PDF, generarlas
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
            doc = fitz.open(pdf_path)
            for i, page in enumerate(doc):
                pix = page.get_pixmap()
                image_path = os.path.join(output_dir, f"pagina_{i+1}.png")
                pix.save(image_path)

        # Obtener la lista de imágenes generadas
        paginas = sorted(os.listdir(output_dir))

        return {
            "titulo": titulo,
            "files": [f"processed_pdfs/{document['documento'].split('.')[0]}/{p}" for p in paginas]
        }, 200

    except Exception as e:
        return {"error": str(e)}, 500