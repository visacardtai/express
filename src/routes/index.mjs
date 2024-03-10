import { Router } from "express";
import userRouter from "./user.mjs"
import productRouter from "./product.mjs"

const router = Router()

router.use(userRouter)
router.use(productRouter)

export default router