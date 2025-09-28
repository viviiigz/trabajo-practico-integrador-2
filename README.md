# Trabajo Práctico 2 - API RESTful con MongoDB y Express

## 1. Decisiones de Modelado: Embebido vs Referenciado

### Relación embebida: Perfil de usuario
El campo `profile` está embebido dentro del documento de usuario.  
**Ventajas:**  
- Acceso rápido y sencillo al perfil junto con los datos del usuario.
- Menor complejidad en consultas y actualizaciones simples.

**Desventajas:**  
- Si el perfil creciera mucho o necesitara ser compartido entre usuarios, sería menos flexible.
- No se puede referenciar el perfil desde otros modelos.

### Relación referenciada: Artículos, Comentarios y Etiquetas
Las relaciones entre usuarios, artículos, comentarios y etiquetas se implementan mediante referencias (`ObjectId`).

**Ventajas:**  
- Permite escalabilidad y reutilización de datos (por ejemplo, un artículo puede tener muchas etiquetas).
- Facilita la normalización y evita duplicidad de datos.
- Permite consultas complejas con `populate`.

**Desventajas:**  
- Requiere más consultas (joins) para obtener datos relacionados.
- Mayor complejidad en la gestión de eliminaciones en cascada.

## 2. Documentación de Endpoints

### Autenticación

#### Registro de usuario
**POST** `/api/auth/register`
```json
Request:
{
  "username": "juan",
  "email": "juan@mail.com",
  "password": "Password123",
  "role": "user", //puede ser opcional
  "profile": {
    "first_name": "Juan",
    "last_name": "Pérez",
    "biography": "Desarrollador",
    "avatar_url": "https://img.com/avatar.jpg",
    "birth_date": "2006-01-01"
  }
}
Response:
{
  "message": "Usuario registrado correctamente",
  "user": "juan"
}
```

#### Login
**POST** `/api/auth/login`
```json
Request:
{
  "username": "juan",
  "password": "Password123"
}
Response:
{
  "msg": "Logeado correctamente"
}
```

#### Obtener perfil
**GET** `/api/auth/profile`
```json
Response:
{
  "_id": "652e...",
  "username": "juan",
  "email": "juan@mail.com",
  "role": "user",
  "profile": {
    "first_name": "Juan",
    "last_name": "Pérez",
    "biography": "Desarrollador",
    "avatar_url": "https://img.com/avatar.jpg",
    "birth_date": "2006-01-01T00:00:00.000Z"
  }
}
```

### Artículos

#### Crear artículo
**POST** `/api/articles`
```json
Request:
{
  "title": "Mi primer artículo",
  "content": "Contenido largo...",
  "tags": ["6530..."]
}
Response:
{
  "message": "Artículo creado exitosamente.",
  "article": { ... }
}
```

#### Listar artículos publicados
**GET** `/api/articles`
```json
Response:
[
  {
    "_id": "6531...",
    "title": "Mi primer artículo",
    "author": { "username": "juan" },
    "tags": [{ "name": "MongoDB" }]
  }
]
```

### Etiquetas

#### Crear etiqueta
**POST** `/api/tags`
```json
Request:
{
  "name": "MongoDB",
  "description": "Base de datos NoSQL"
}
Response:
{
  "message": "Etiqueta creada exitosamente.",
  "tag": { ... }
}
```

### Comentarios

#### Crear comentario
**POST** `/api/comments`
```json
Request:
{
  "content": "Muy buen artículo!",
  "articleId": "6531..."
}
Response:
{
  "message": "Comentario creado exitosamente.",
  "comment": { ... }
}
```

## 3. Instrucciones de Instalación y Configuración

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repo>
   cd trabajo-practico2
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   - Copiar `.env.example` a `.env` y completar:
     ```
     PORT=3000
     JWT_SECRET=tu_clave_secreta
     ```

4. **Iniciar el servidor**
   ```bash
   npm run dev
   ```

## 4. Validaciones Personalizadas

- **Usuarios:**  
  - Username único, longitud mínima y máxima.
  - Email único y formato válido.
  - Contraseña con mínimo de 8 caracteres, mayúscula, minúscula y número.
  - Rol permitido: `user` o `admin`.

- **Perfil:**  
  - Nombre y apellido obligatorios, solo letras y espacios.
  - Biografía opcional, máximo 500 caracteres.
  - Avatar URL válida.
  - Fecha de nacimiento en formato ISO.

- **Artículos y Etiquetas:**  
  - Título y contenido con longitud mínima.
  - Validación de IDs de artículos y etiquetas (ObjectId válido y existencia en la base).

- **Comentarios:**  
  - Contenido obligatorio, máximo 500 caracteres.
  - Validación de ID de comentario.

Las validaciones se implementan con `express-validator` y se retornan errores claros en el response.

---
