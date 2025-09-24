import bcrypt from "bcrypt";

export const hashPassword = (password) => {
    try {
        return bcrypt.hash(password, 10);
    } catch (error) {
        console.log("Error al hashear la contraseña", error);
        throw new Error("No se pudo hashear la contraseña") 
    };
};

export const comparePasswords = (password, hashPassword) => {
    try {
        return bcrypt.compare(password, hashPassword)
    } catch (error) {
        console.error("Error al comparar contraseñas", error);
        throw new Error("Error al autenticar")
    };
};