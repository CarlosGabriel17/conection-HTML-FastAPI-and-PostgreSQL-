import os
import psycopg2
from psycopg2.extras import RealDictCursor


def get_connection():
    """Abre y devuelve una conexión a PostgreSQL usando los parámetros de la práctica."""
    return psycopg2.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=os.getenv("DB_PORT", "5432"),
        dbname=os.getenv("DB_NAME", "clase_web"),
        user=os.getenv("DB_USER", "clase_user"),
        password=os.getenv("DB_PASSWORD", "clase123"),
        cursor_factory=RealDictCursor,
    )
