from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.lote_service import add_document_to_lote, get_documents_from_lote, get_unselected_documents_service
from services.document_service import save_document_indexing

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

@lote_routes.route("/indexar", methods=["POST"])
@jwt_required()
def indexar_documento():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    print("Datos recibidos en el servidor:", data)  # Debug log
    
    documento_id = data.get("documento_id")
    tipo_documento = data.get("tipo_documento")
    paginas_indexar = data.get("paginas_indexar")
    datos_indexacion = data.get("datos_indexacion")
    
    print("Datos procesados:", {  # Debug log
        "documento_id": documento_id,
        "tipo_documento": tipo_documento,
        "paginas_indexar": paginas_indexar,
        "datos_indexacion": datos_indexacion
    })
    
    response, status = save_document_indexing(
        documento_id,
        tipo_documento,
        paginas_indexar,
        datos_indexacion
    )
    
    return jsonify(response), status