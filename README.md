# API REST de Productos, Usuarios y Auth 🛍️

## Descripción
API RESTful construida con Express.js y MongoDB para gestionar un catálogo de productos, incluyendo operaciones CRUD, búsquedas avanzadas y filtros por categoría y rango de precio. Además, incorpora gestión de usuarios con autenticación y autorización basada en roles, permitiendo controlar el acceso a rutas protegidas mediante tokens almacenados en cookies.

---

## Dependencias del Proyecto
Las dependencias que se utilizan en este proyecto son:
-   **cookie-parser**
-   **express**
-   **jsonwebtoken**
-   **mongoose**
-   **morgan**
-   **swagger-ui-express** (proximamente).

## Cómo usar el proyecto

1. Clonar el repositorio:
    ```bash
        git clone https://github.com/Ragepay/TP-Integrador-Backend-UNTREF-Peyraga.git
        cd TP-INTEGRADOR-PEYRAGA

2. Instalar dependencias:
    ```bash
        npm install

3. Crear un archivo `.env` en la raíz con las variables necesarias. Ejemplo:
    ```bash
        SECRET_KEY=TuClaveSecreta
        PORT=9000
        MODE=DEVELOPMENT
        MONGO=mongodb+srv://<Usuario>:<Contraseña>@coderback.vqrxnc2.mongodb.net/<Nombre-de-la-BBD>?retryWrites=true&w=majority&appName=<Nombre-del-cluster>

4. Ejecutar la aplicación:
    ```bash
        pnpm dev

5. Crear un usuario con rol ADMIN para usar las rutas protegidas:
   - Usa Postman, REST Client o similar para hacer un POST a `/api/usuarios/register` con un JSON que incluya `"role": "ADMIN"`.
   - Luego haz login en `/api/usuarios/login` para obtener el token(almacenado en la cookie `token`) que te permitirá acceder a las rutas protegidas.

6. Poblar la base de datos con los datos del archivo JSON seleccionado (en este caso, computación):
   - Usa la ruta protegida `POST /api/productos/upload` para subir el archivo JSON y cargar los productos a la base de datos.

7. Documentación (próximamente disponible en):
   /api-docs

---

**Notas importantes:**

- No olvides incluir `.env` y `node_modules` en tu `.gitignore` para evitar subir datos sensibles o innecesarios.
- Ajusta los datos de conexión y usuarios según tu entorno.
- Para probar la API, puedes usar el archivo `api.http` incluido con la extensión REST Client de VSCode o cualquier cliente HTTP.

---

¡Listo! Ahora estás preparado para arrancar con la API REST de Productos y Usuarios con Auth. 🚀