import express from "express"
import {query, body, checkSchema, validationResult, matchedData} from "express-validator"
import { Router } from "express"
import { createUserValidationSchemas } from "../utils/validationSchemas.mjs"
import { mockUsers } from "../utils/mockUser.mjs"

const router = Router()



const resolveIndex = (request,response,next) =>{
    const {body, params:{id}} = request
    const parsedID = parseInt(id)
    if (isNaN(parsedID)) return response.sendStatus(400)
    const findUser = mockUsers.findIndex(user => user.id === parsedID)
    if (findUser === -1) return response.sendStatus(404)
    request.findUser = findUser
    next()
}

router.get("/api/users/:id", (request,response) =>{
    const parsedID = parseInt(request.params.id)
    if(isNaN(parsedID)) return response.status(400).send({msg:"Bad request. Invalid ID"})
    
    const findUser = mockUsers.find((user)=> user.id === parsedID)
    if (!findUser) return response.sendStatus(404)
    console.log(request.headers.cookie)
    console.log(request.cookies)
    return response.send(findUser)
})

router.get("/api/users", 
query("filter").isString().notEmpty().isLength({min:5,max:10}).withMessage("String is lenght to 5-10"),
(request,response) =>{
    request.sessionStore.get(request.session.id, (err, sessionData)=>{
        if (err) {
            console.log(err)
            throw err
        }
        console.log(sessionData)
    })
    const result = validationResult(request)
    console.log(result)
    const {query:{filter,value}} = request
    if (!filter && ! value) return response.send(mockUsers) 
    if (filter && value) {
        return response.send(mockUsers.filter(user => user[filter].includes(value)))
    }
})

router.post("/api/users",
    checkSchema(createUserValidationSchemas),
    (request,response) => {
    const result = validationResult(request)
    console.log(result)
    if (!result.isEmpty()) return response.status(400).send({errors : result.array()})
    const data = matchedData(request)
    const newUser = {id: mockUsers[mockUsers.length - 1].id + 1, ...data}
    mockUsers.push(newUser)
    return response.status(200).send(newUser)
})

router.put("/api/users/:id",resolveIndex,(request, response)=>{
    const {body, findUser} = request
    mockUsers[findUser] = {id:mockUsers[findUser].id, ...body}
    return response.send(mockUsers)
})

export default router