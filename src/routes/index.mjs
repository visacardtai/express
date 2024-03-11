import { Router } from "express";
import userRouter from "./user.mjs"
import productRouter from "./product.mjs"
import cartRouter from "./cart.mjs"

const router = Router()

router.use(userRouter)
router.use(productRouter)
router.use(cartRouter)


export default router