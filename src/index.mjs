import express from "express"
import { query, validationResult, body } from "express-validator";

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 3000

const mockUsers = [{
    "id": 1,
    "name": "jack"
},{
    "id": 2,
    "name": "Adam"
},{
    "id": 3,
    "name": "Jonh"
}]

const resolveIndex = (request,response,next) =>{
    const {body, params:{id}} = request
    const parsedID = parseInt(id)
    if (isNaN(parsedID)) return response.sendStatus(400)
    const findUser = mockUsers.findIndex(user => user.id === parsedID)
    if (findUser === -1) return response.sendStatus(404)
    request.findUser = findUser
    next()
}

app.get("/api/users/:id", (request,response) =>{
    const parsedID = parseInt(request.params.id)
    if(isNaN(parsedID)) return response.status(400).send({msg:"Bad request. Invalid ID"})
    
    const findUser = mockUsers.find((user)=> user.id === parsedID)
    if (!findUser) return response.sendStatus(404)
    return response.send(findUser)
})

app.get("/api/users", 
query("filter").isString().notEmpty().isLength({min:5,max:10}).withMessage("String is lenght to 5-10"),
(request,response) =>{
    const result = validationResult(request)
    console.log(result)
    const {query:{filter,value}} = request
    if (!filter && ! value) return response.send(mockUsers) 
    if (filter && value) {
        return response.send(mockUsers.filter(user => user[filter].includes(value)))
    }
})

app.post("/api/users",body("username").isString().notEmpty(),body("password").isString().notEmpty(), (request,response) => {
    const result = validationResult(request)
    console.log(result)
    console.log(request.body)
    return response.send("abc")
})

app.put("/api/users/:id",resolveIndex,(request, response)=>{
    const {body, findUser} = request
    mockUsers[findUser] = {id:mockUsers[findUser].id, ...body}
    return response.send(mockUsers)
})

app.listen(PORT, ()=>{
    console.log(`Running on Port ${PORT}`)
})