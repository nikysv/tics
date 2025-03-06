from flask import Blueprint, request, jsonify, send_from_directory
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.document_service import upload_document_service, get_documents_service, get_document_service
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

@document_routes.route("/documento/<titulo>", methods=["GET"])
@jwt_required()
def get_documento(titulo):
    user_id = get_jwt_identity()
    response, status = get_document_service(user_id, titulo)
    return jsonify(response), status

@document_routes.route("/processed_pdfs/<folder>/<filename>", methods=["GET"])
def serve_processed_pdf(folder, filename):
    folder_path = os.path.join(Config.PROCESSED_FOLDER, folder)
    return send_from_directory(folder_path, filename, mimetype="image/png")
