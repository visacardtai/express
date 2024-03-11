import express from "express"
import cookieParser from "cookie-parser";
import session from "express-session"
import morgan from "morgan";
import { query, validationResult, body, checkSchema, matchedData, Result } from "express-validator";
import { createUserValidationSchemas } from "./utils/validationSchemas.mjs"
import { mockUsers } from "./utils/mockUser.mjs";
import router from "./routes/index.mjs";
const app = express();
app.use(express.json())
app.use(morgan("combined"))
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
    console.log(request.session)
    console.log(request.session.id)
    request.session.visited = true;
    response.cookie("key","1234", {maxAge: 60000, signed:true})
    response.status(200).send("oke")
})

app.post("/api/auth", checkSchema(createUserValidationSchemas) ,(req,res)=>{
    const {body: {username,password}} = req
    console.log(username + password)
    const findUser = mockUsers.find(user=> user.username === username)
    if (!findUser || findUser.password !== password) return res.status(401).send({msg: "Bad Cridentials"})
    req.session.user = findUser
    return res.status(200).send(findUser)
})

app.get("/api/auth/status", (req,res)=>{
    return req.session.user ? res.status(200).send(req.session.user) : res.status(401).send({msg: "Bad Cridentials"})
})