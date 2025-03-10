class Lote:
    def __init__(self, id, user_id, document_id, status, fecha_asignacion):
        self.id = id
        self.user_id = user_id
        self.document_id = document_id
        self.status = status
        self.fecha_asignacion = fecha_asignacion

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "document_id": self.document_id,
            "status": self.status,
            "fecha_asignacion": self.fecha_asignacion,
        }