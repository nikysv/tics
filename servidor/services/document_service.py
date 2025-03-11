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

def get_document_service_by_titulo(user_id, titulo):
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        cursor.execute("SELECT * FROM documento WHERE usuario_id = %s AND titulo = %s", (user_id, titulo))
        document = cursor.fetchone()
        
        if not document:
            return {"error": "Documento no encontrado"}, 404

        return process_document_pages(document)
    
    except Exception as e:
        print("Error:", str(e))
        return {"error": str(e)}, 500

def get_document_service_by_id(user_id, doc_id):
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        print(f"Buscando documento {doc_id} para usuario {user_id}")

        # Modificar la consulta para obtener el documento directamente
        cursor.execute("""
            SELECT DISTINCT d.* 
            FROM documento d
            INNER JOIN lote l ON d.id = l.documento_id
            WHERE l.usuario_id = %s AND d.id = %s
        """, (user_id, doc_id))
        
        document = cursor.fetchone()
        print(f"Documento encontrado: {document}")

        if not document:
            return {"error": "Documento no encontrado"}, 404

        return process_document_pages(document)

    except Exception as e:
        print(f"Error en get_document_service_by_id: {str(e)}")
        return {"error": str(e)}, 500
    finally:
        cursor.close()
        db.close()

def process_document_pages(document):
    """Función auxiliar para procesar las páginas del documento"""
    try:
        pdf_path = os.path.join(Config.UPLOAD_FOLDER, document["documento"])
        output_dir = os.path.join(Config.PROCESSED_FOLDER, f"doc_{document['id']}")

        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
            doc = fitz.open(pdf_path)
            for i, page in enumerate(doc):
                pix = page.get_pixmap()
                image_path = os.path.join(output_dir, f"pagina_{i+1}.png")
                pix.save(image_path)

        paginas = sorted(os.listdir(output_dir))

        return {
            "id": document["id"],
            "titulo": document["titulo"],
            "files": [f"processed_pdfs/doc_{document['id']}/{p}" for p in paginas]
        }, 200

    except Exception as e:
        print("Error procesando páginas:", str(e))
        return {"error": str(e)}, 500

def get_document_indexing(documento_id):
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        # Primero verificar si existe indexación
        cursor.execute("""
            SELECT DISTINCT i.tipo_documento
            FROM indexacion i
            WHERE i.documento_id = %s
            LIMIT 1
        """, (documento_id,))
        
        doc_info = cursor.fetchone()
        
        if not doc_info:
            print(f"No hay indexación para el documento {documento_id}")
            return {
                'tipo_documento': None,
                'campos': {}
            }

        # Obtener campos indexados
        cursor.execute("""
            SELECT 
                i.numero_pag,
                i.palabra_clave,
                c.nombre_campo
            FROM indexacion i
            JOIN campo_indexacion c ON i.campo_id = c.id
            WHERE i.documento_id = %s
            ORDER BY i.numero_pag, c.nombre_campo
        """, (documento_id,))
        
        campos = cursor.fetchall()
        
        datos_indexados = {
            'tipo_documento': doc_info['tipo_documento'],
            'campos': {}
        }
        
        for campo in campos:
            if campo['numero_pag'] not in datos_indexados['campos']:
                datos_indexados['campos'][campo['numero_pag']] = {}
            datos_indexados['campos'][campo['numero_pag']][campo['nombre_campo']] = campo['palabra_clave']

        print("Datos indexados:", datos_indexados)
        return datos_indexados

    except Exception as e:
        print("Error obteniendo indexación:", str(e))
        return {
            'tipo_documento': None,
            'campos': {}
        }
    finally:
        cursor.close()
        db.close()

def save_document_indexing(documento_id, tipo_documento, paginas_indexar, datos_indexacion):
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        # Verificar si ya existe indexación
        cursor.execute("""
            SELECT COUNT(*) as count FROM indexacion WHERE documento_id = %s
        """, (documento_id,))
        
        existe = cursor.fetchone()['count'] > 0
        
        if existe:
            print("Actualizando indexación existente")
            # Eliminar indexación anterior
            cursor.execute("DELETE FROM indexacion WHERE documento_id = %s", (documento_id,))

        print(f"Intentando guardar indexación para documento {documento_id}")
        print(f"Tipo documento: {tipo_documento}")
        print(f"Datos indexación: {datos_indexacion}")
        print(f"Páginas a indexar: {paginas_indexar}")

        # Obtener campos disponibles con sus nombres
        cursor.execute("SELECT id, nombre_campo FROM campo_indexacion")
        campos = cursor.fetchall()
        
        if not campos:
            print("No se encontraron campos de indexación definidos")
            return {"error": "No hay campos de indexación definidos"}, 400

        # Mapeo de campos a IDs
        campo_mapping = {campo['nombre_campo']: campo['id'] for campo in campos}
        print(f"Mapeo de campos: {campo_mapping}")

        # Para cada página seleccionada para indexar
        for num_pagina, indexar in paginas_indexar.items():
            if indexar == "si":
                print(f"Procesando página {num_pagina}")
                # Insertar datos para cada campo que tenga valor
                for nombre_campo, valor in datos_indexacion.items():
                    campo_id = campo_mapping.get(nombre_campo)
                    if campo_id:
                        query = """
                            INSERT INTO indexacion 
                            (documento_id, campo_id, tipo_documento, numero_pag, palabra_clave)
                            VALUES (%s, %s, %s, %s, %s)
                            ON DUPLICATE KEY UPDATE 
                            palabra_clave = VALUES(palabra_clave),
                            tipo_documento = VALUES(tipo_documento)
                        """
                        print(f"Guardando: campo={nombre_campo}, valor={valor}, campo_id={campo_id}")
                        cursor.execute(query, 
                                    (documento_id, campo_id, tipo_documento, 
                                     int(num_pagina) + 1, valor))

        # Actualizar estado en la tabla lote
        cursor.execute("""
            UPDATE lote SET estado = 'indexado'
            WHERE documento_id = %s
        """, (documento_id,))
        
        db.commit()
        return {"message": "Indexación guardada correctamente"}, 200

    except Exception as e:
        print(f"Error guardando indexación: {str(e)}")
        db.rollback()
        return {"error": str(e)}, 500
    finally:
        cursor.close()
        db.close()

def get_campos_por_tipo(tipo_documento):
    """Obtiene los campos de indexación según el tipo de documento"""
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    
    try:
        cursor.execute("SELECT * FROM campo_indexacion WHERE tipo_documento = %s", (tipo_documento,))
        return cursor.fetchall()
    finally:
        cursor.close()
        db.close()