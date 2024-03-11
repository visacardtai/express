import { Router } from "express";

const router = Router();

router.post("/api/cart",(req, res)=> {
    if (!req.session.user) return res.sendStatus(401);
    const {body : item} = req
    const { cart} = req.session
    if(cart) {
        cart.push(item)
    } else {
        req.session.cart = [item]
    }
    return res.status(201).send(item)
})

router.get("/api/cart", (req, res)=> {
    if(!req.session.user) return res.sendStatus(401)
    const {cart} = req.session
    if(cart) {
        return res.status(201).send(cart)
    }
    return res.status(403).send({msg:"Data is null"})
})

export default router