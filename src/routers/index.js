import express from 'express';
import userRouter from './userRouter.js';
import productRouter from './productRouter.js';

const router = express();

router.use("/users", userRouter);
router.use("/products", productRouter);

export default router