# Práctica: conectar HTML, FastAPI y PostgreSQL (GET y POST)

Proyecto full-stack local que conecta un frontend modular (`HTML + CSS + JS fetch`) con un backend en **FastAPI** y persistencia en **PostgreSQL** (`clase_web`, tabla `alumnos`).

## 1. Crear usuario, base de datos y tabla en PostgreSQL
Conéctate como administrador (`psql -U postgres -h localhost`):
```sql
CREATE USER clase_user WITH PASSWORD 'clase123';
CREATE DATABASE clase_web OWNER clase_user;
```
Sal con `\q` y conéctate como `clase_user` (`psql -U clase_user -h localhost -d clase_web`):
```sql
CREATE TABLE alumnos (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    carrera VARCHAR(80) NOT NULL
);
```

## 2. Iniciar el backend (puerto 8000)
```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload
```
Documentación interactiva: `http://127.0.0.1:8000/docs`

## 3. Iniciar el frontend (puerto 5500)
En una segunda terminal:
```powershell
cd frontend
python -m http.server 5500
```
Aplicación web: `http://localhost:5500`
