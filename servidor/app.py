from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config.config import Config

from routes.auth_routes import auth_routes
from routes.user_routes import user_routes
from routes.document_routes import document_routes
from routes.lote_routes import lote_routes


app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
jwt = JWTManager(app)

# Registrar Blueprints (Rutas)
app.register_blueprint(auth_routes, url_prefix="/auth")
app.register_blueprint(user_routes, url_prefix="/users")
app.register_blueprint(document_routes, url_prefix="/documents")
app.register_blueprint(lote_routes, url_prefix="/lotes")

if __name__ == "__main__":
    app.run(debug=True)