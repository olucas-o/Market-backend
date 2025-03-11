import { Router } from 'express';
import userController from '../controllers/usersController.js';
import { validate, validateId } from '../middleware/validationMiddlewares.js'; 
import { userSchema } from '../schemas/userSchema.js';
import {authMiddleware} from '../middleware/authMeddlewares.js'


const router = Router();

router.post(
    '/',
    validate(userSchema),
    userController.createUserController
);
router.post(
    '//login',
    userController.loginController
);
router.use(authMiddleware)
router.get(
    '/', 
    userController.findAllUsersController
);
router.get('/:id',
    validateId,
    userController.findUserByIdController
);
router.patch('/:id',
    validateId,
    userController.updateUserController
);
router.delete('/:id',
    validateId, 
    userController.deleteUserContreller
);


export default router;