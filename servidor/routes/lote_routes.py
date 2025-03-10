from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.lote_service import add_document_to_lote, get_documents_from_lote, get_unselected_documents_service

lote_routes = Blueprint("lote_routes", __name__)

@lote_routes.route("/add", methods=["POST"])
@jwt_required()
def add_to_lote():
    user_id = get_jwt_identity()  # Obtener el ID del usuario autenticado
    data = request.get_json()
    document_id = data.get("document_id")  # Asegúrate de usar "document_id"

    if not document_id:
        return jsonify({"error": "El ID del documento es obligatorio"}), 400

    response, status = add_document_to_lote(user_id, document_id)
    return jsonify(response), status

@lote_routes.route("/no-seleccionados", methods=["GET"])
@jwt_required()
def get_unselected_documents():
    user_id = get_jwt_identity()
    response, status = get_unselected_documents_service(user_id)
    return jsonify(response), status

@lote_routes.route("/mislotes", methods=["GET"])
@jwt_required()
def get_documents():
    user_id = get_jwt_identity()
    response, status = get_documents_from_lote(user_id)
    return jsonify(response), status