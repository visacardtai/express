import express from "express"
import cookieParser from "cookie-parser";
import session from "express-session"
import { query, validationResult, body, checkSchema, matchedData, Result } from "express-validator";
import { createUserValidationSchemas } from "./utils/validationSchemas.mjs"
import router from "./routes/index.mjs";
const app = express();
app.use(express.json())
app.use(cookieParser("helloworld"))
app.use(session({
    secret: "nguyentientai",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60
    }
}))

const PORT = process.env.PORT || 3000

app.use(router)

app.listen(PORT, ()=>{
    console.log(`Running on Port ${PORT}`)
})

app.get("/api/cookie", (request,response) =>{
    response.cookie("key","1234", {maxAge: 60000, signed:true})
    response.status(200).send("oke")
})