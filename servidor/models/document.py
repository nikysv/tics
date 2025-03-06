class Document:
    def __init__(self, id, usuario_id, titulo, documento):
        self.id = id
        self.usuario_id = usuario_id
        self.titulo = titulo
        self.documento = documento

    def to_dict(self):
        return {"id": self.id, "titulo": self.titulo, "documento": self.documento}