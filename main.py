from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import get_connection

app = FastAPI(
    title="Práctica GET y POST - Alumnos",
    description="Conectar HTML, FastAPI y PostgreSQL utilizando únicamente GET y POST.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5500",
        "http://127.0.0.1:5500",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AlumnoCreate(BaseModel):
    nombre: str
    carrera: str


@app.get("/alumnos")
def obtener_alumnos():
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT id, nombre, carrera FROM alumnos ORDER BY id ASC;")
            return cur.fetchall()
    finally:
        conn.close()


@app.post("/alumnos", status_code=201)
def crear_alumno(alumno: AlumnoCreate):
    nombre = alumno.nombre.strip()
    carrera = alumno.carrera.strip()
    if not nombre or not carrera:
        raise HTTPException(
            status_code=400,
            detail="Los campos 'nombre' y 'carrera' son obligatorios.",
        )

    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO alumnos (nombre, carrera)
                VALUES (%s, %s)
                RETURNING id, nombre, carrera;
                """,
                (nombre, carrera),
            )
            nuevo_alumno = cur.fetchone()
            conn.commit()
            return nuevo_alumno
    finally:
        conn.close()
