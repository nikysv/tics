class User:
    def __init__(self, id, nombre, correo, contraseña):
        self.id = id
        self.nombre = nombre
        self.correo = correo
        self.contraseña = contraseña

    def to_dict(self):
        return {"id": self.id, "nombre": self.nombre, "correo": self.correo}
