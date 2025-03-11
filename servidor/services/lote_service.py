import datetime
from models import get_db_connection

def add_document_to_lote(user_id, document_id):
    db = get_db_connection()
    cursor = db.cursor()

    try:
        # Insertar el documento en el lote con estado "pendiente"
        query = """
            INSERT INTO lote (usuario_id, documento_id, estado, fecha_asignacion)
            VALUES (%s, %s, %s, %s)
        """
        fecha_asignacion = datetime.datetime.now()
        cursor.execute(query, (user_id, document_id, "pendiente", fecha_asignacion))
        db.commit()

        return {"message": "Documento añadido al lote exitosamente!"}, 201
    except Exception as e:
        db.rollback()
        return {"error": str(e)}, 500
    finally:
        cursor.close()
        db.close()


def get_documents_from_lote(user_id):
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    query = """
        SELECT 
            u.nombre, 
            d.id,
            d.titulo, 
            d.documento
        FROM 
            lote l
        INNER JOIN 
            usuarios u ON l.usuario_id = u.id
        INNER JOIN 
            documento d ON l.documento_id = d.id
        WHERE 
            l.usuario_id = %s
    """
    
    cursor.execute(query, (user_id,))
    results = cursor.fetchall()

    return results, 200

def get_unselected_documents_service(user_id):
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    query = """
        SELECT d.id, d.titulo, d.documento, d.fecha_registro
        FROM DOCUMENTO d
        LEFT JOIN LOTE l ON d.id = l.documento_id
        WHERE l.documento_id IS NULL
        AND d.usuario_id != %s;
    """
    cursor.execute(query, (user_id,))
    documents = cursor.fetchall()

    return documents, 200