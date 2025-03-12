import { Router } from "express";
import productsController from "../controllers/productController.js";
import { validate, validateId} from '../middleware/validationMiddlewares.js'; 
import { productsSchema } from '../schemas/productSchema.js';
import { authMiddleware } from "../middleware/authMeddlewares.js";

const router = Router()
router.get(
    '/',
    productsController.findAllProductsController
);
router.use(authMiddleware);
router.post(
    '/',
    validate(productsSchema),
    productsController.createProductController
);
router.get(
    '/search',
    productsController.searchProductsController
);
router.get(
    '/class/search',
    productsController.searchProductsClassController
);
router.get(
    '/:id',
    validateId,
    productsController.findProductsByIdController
);
router.patch('/:id',
    validate(productsSchema), 
    validateId,
    productsController.updateProductsController
);
router.delete(
    '/:id',
    validateId,
    productsController.deleteProductsContreller
);

export default router;