import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        // verifica que exista un token
        if (!token) {
            return res.status(401).json({ message: "No autenticado. Por favor, inicie sesión." });
        }

        // verifica y decodifica el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido o expirado. Por favor, inicie sesión de nuevo." });
    }
};