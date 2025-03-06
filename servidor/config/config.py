import os
from dotenv import load_dotenv

# Cargar variables desde .env
load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", "uploads")
    PROCESSED_FOLDER = os.getenv("PROCESSED_FOLDER", "processed_pdfs")

class DatabaseConfig:
    DB_HOST = os.getenv("DB_HOST")
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_NAME = os.getenv("DB_NAME")
