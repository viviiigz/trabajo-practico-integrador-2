 TRABAJO PRÁCTICO INTEGRADOR 2

---Características y Tecnologías Clave---
Autenticación Segura (jwt): Utilizo JSON Web Tokens para manejar las sesiones. Los tokens se almacenan de forma segura en cookies.

Gestión de Datos: Uso Mongoose para la conexión con MongoDB. El modelo de usuario incluye un subdocumento anidado (profile) para manejar la información personal.

Seguridad: Implementé bcrypt para el hasheo de contraseñas y un authMiddleware que protege todas las rutas sensibles.

Validación Estricta: 


--- Instalación y Uso---
1. Requisitos
Tener Node.js y una instancia de MongoDB disponibles.

Ejecuta npm install para instalar todas las dependencias.

Crea un archivo .env en la raíz del proyecto.

Configura tus variables de entorno usando el .env.example.

2. Ejecución del Servidor
Bash

npm run dev

---Endpoints Implementados ---
 --Para la Autentificación--
La API utiliza el prefijo /api/auth para todas las rutas de sesión.

1. Registro (POST /api/auth/register) 
Crea un nuevo usuario, hashea la contraseña y valida todos los campos, incluyendo los datos anidados del perfil.

2. Login (POST /api/auth/login)
Verifica las credenciales y, si son correctas, emite el JWT en una cookie.

3. Logout (POST /api/auth/logout) 
--Ruta Protegida--- Solo se ejecuta si el usuario está autenticado (gracias al authMiddleware). Su función es simplemente eliminar la cookie de sesión (res.clearCookie("token")).

---El Porqué del Embebido (Modelo de Datos)---
Usé la técnica de subdocumentos embebidos para el perfil (first_name, biography, etc.) en mi UserModel.

1. ¿Cómo Lo Hice?
Definí el objeto profile anidado dentro del esquema principal de usuario. En el controlador, paso el objeto anidado (profile: req.body.profile) al crear el usuario.

2. ¿Por Qué Lo Hice?
La razón es la simplicidad:

 Garantiza que el perfil y la cuenta sean una sola unidad y siempre estén sincronizados.