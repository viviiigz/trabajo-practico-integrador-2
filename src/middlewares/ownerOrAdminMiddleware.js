// le digo que modelo buscar (Model)
// y que campo tiene el id del dueño (authorField) 
export const isOwnerOrAdmin = (Model, authorField = 'author') => { //no es el middleware. Es solo el creador del middleware.
    //authorField es el nombre del campo en el modelo que guarda el id del autor por ej author o userId
    return async (req, res, next) => { //ahora entrega esta nueva función a Express para que la ejecute en la ruta
        try {
            const user = req.user; 
            const recursoId = req.params.id;

            if (user && user.role === 'admin') {
                return next();
            }

            // usando el Modelo que nos pasaron, buscamos el recurso por su id
            const recurso = await Model.findById(recursoId);

            if (!recurso) {
                return res.status(404).json({ msg: `${Model.modelName} no encontrado.` });
            }

                   
            // uso el nombre del campo ej:author para leer el id del dueño del recurso.
            // lo paso a texto (.toString()) para compararlo con el id del usuario.

            const isOwner = recurso[authorField].toString() === user.id;

            if (!isOwner) {
                return res.status(403).json({ msg: 'Acceso denegado. No tiene los permisos necesarios.' });
            }

            next();

        } catch (error) {
            
            return res.status(500).json({ msg: 'Error interno del servidor.' });
        }
    };
};
//authorField es el parámetro que usamos para
//  configurar el nombre de la columna del dueño y hacer que el código sea reusable en todos nuestros modelos.