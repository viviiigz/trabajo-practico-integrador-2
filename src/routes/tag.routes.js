import { Router } from "express";
import { authMiddleware} from "../middlewares/authMiddleware.js"; 
import { authAdminMiddleware } from "../middlewares/adminMiddleware.js";
import { validator } from "../middlewares/validator.js"; // 👈 ¡Importación agregada!

import { 
    createTag, 
    getAllTags, 
    getTagById, 
    updateTag, 
    deleteTag 
} from '../controllers/tag.controllers.js';

import { 
    createTagValidator, 
    updateTagValidator,
    validateTagIdInParams
} from '../middlewares/validations/tag.validator.js';

export const tagRouter = Router();

tagRouter.post(
    "/tags", 
    authMiddleware,         
    authAdminMiddleware,        
    createTagValidator, 
    validator,            
    createTag               
);

tagRouter.get(
    "/tags", 
    authMiddleware,         
    getAllTags              
);

tagRouter.get(
    "/tags/:id", 
    authMiddleware,         
    validateTagIdInParams,
    validator,              
    getTagById              
);

tagRouter.put(
    "/tags/:id", 
    authMiddleware,         
    authAdminMiddleware,        
    updateTagValidator, 
    validator,              
    updateTag               
);

tagRouter.delete(
    "/tags/:id", 
    authMiddleware,         
    authAdminMiddleware,        
    validateTagIdInParams,  
    validator,            
    deleteTag               
);

