import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    try {
        // token con la información del usuario
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        return token;
    } catch (error) {
        console.error("Error al generar el token:", error);
        throw new Error("No se pudo generar el token.");
    }
};

export const verifyToken = (token) => {
    try {
        // verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        // manejar errores de token invalido o expirado
        console.error("Error al verificar el token:", error);
        throw new Error("Token inválido o expirado.");
    }
};