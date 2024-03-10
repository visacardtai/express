import { Router } from "express"
import cookieParser from "cookie-parser"

const router = Router()

router.get("/api/product", (request,response)=> {
    console.log(request.signedCookies)
    if (request.signedCookies.key && request.signedCookies.key === "1234") {
        return response.send([{id:1, name: "tientai", price: 1.2}])
    }
    return response.status(403).send({
        msg: "you need the correct cookie!!!"
    })
})

export default router