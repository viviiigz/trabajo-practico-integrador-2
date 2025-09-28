import { Router } from "express";
import { authMiddleware} from "../middlewares/authMiddleware.js"; 
import { authAdminMiddleware } from "../middlewares/adminMiddleware.js";
import { validator } from "../middlewares/validator.js"; 

import { 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
} from '../controllers/user.controllers.js';

import { 
    updateUserValidator,
    validateUserIdInParams
} from '../middlewares/validations/user.validator.js'; 

export const userRouter = Router();

userRouter.get(
    "/users", 
    authMiddleware,         
    authAdminMiddleware, 
    getAllUsers 
);


userRouter.get(
    "/users/:id", 
    authMiddleware, 
    authAdminMiddleware, 
    validateUserIdInParams,
    validator, 
    getUserById 
);

userRouter.put(
    "/users/:id", 
    authMiddleware, 
    authAdminMiddleware, 
    updateUserValidator, 
    validator, 
    updateUser 
);

userRouter.delete(
    "/users/:id", 
    authMiddleware,
    authAdminMiddleware, 
    validateUserIdInParams, 
    validator, 
    deleteUser );

