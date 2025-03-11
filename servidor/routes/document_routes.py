from flask import Blueprint, request, jsonify, send_from_directory
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.document_service import upload_document_service, get_documents_service, get_document_service_by_titulo, get_document_service_by_id, save_document_indexing, get_document_indexing
from config.config import Config
import os

document_routes = Blueprint("document_routes", __name__)

@document_routes.route("/upload", methods=["POST"])
@jwt_required()
def upload_document():
    user_id = get_jwt_identity()
    title = request.form.get("title")
    file = request.files.get("file")

    response, status = upload_document_service(user_id, title, file)
    return jsonify(response), status

@document_routes.route("/documentos", methods=["GET"])
@jwt_required()
def get_documents():
    user_id = get_jwt_identity()
    response, status = get_documents_service(user_id)
    return jsonify(response), status

@document_routes.route("/documento/titulo/<titulo>", methods=["GET"])
@jwt_required()
def get_documento_by_titulo(titulo):
    user_id = get_jwt_identity()
    response, status = get_document_service_by_titulo(user_id, titulo)
    return jsonify(response), status

@document_routes.route("/documento/id/<int:doc_id>", methods=["GET"])
@jwt_required()
def get_documento_by_id(doc_id):
    user_id = get_jwt_identity()
    response, status = get_document_service_by_id(user_id, doc_id)
    return jsonify(response), status

@document_routes.route("/processed_pdfs/<folder>/<filename>", methods=["GET"])
def serve_processed_pdf(folder, filename):
    folder_path = os.path.join(Config.PROCESSED_FOLDER, folder)
    return send_from_directory(folder_path, filename, mimetype="image/png")

@document_routes.route("/documento/indexar", methods=["POST"])
@jwt_required()
def save_indexing():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    print("Datos recibidos para indexación:", data)
    
    documento_id = data.get("documento_id")
    tipo_documento = data.get("tipo_documento")
    paginas_indexar = data.get("paginas_indexar")
    datos_indexacion = data.get("datos_indexacion")
    
    if not all([documento_id, tipo_documento, paginas_indexar, datos_indexacion]):
        return jsonify({"error": "Faltan datos requeridos"}), 400
        
    response, status = save_document_indexing(
        documento_id, 
        tipo_documento, 
        paginas_indexar,
        datos_indexacion
    )
    
    print("Respuesta de indexación:", response)
    return jsonify(response), status

@document_routes.route("/documento/<int:doc_id>/indexacion", methods=["GET"])
@jwt_required()
def get_documento_indexacion(doc_id):
    indexacion = get_document_indexing(doc_id)
    return jsonify(indexacion if indexacion else []), 200
