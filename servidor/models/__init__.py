import mysql.connector
from config.config import DatabaseConfig

def get_db_connection():
    return mysql.connector.connect(
        host=DatabaseConfig.DB_HOST,
        user=DatabaseConfig.DB_USER,
        password=DatabaseConfig.DB_PASSWORD,
        database=DatabaseConfig.DB_NAME
    )
