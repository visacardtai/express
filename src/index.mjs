import express from "express"

const app = express();

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

app.get("/api/user/:id", (request,response) =>{
    const parsedID = parseInt(request.params.id)
    if(isNaN(parsedID)) return response.status(400).send({msg:"Bad request. Invalid ID"})
    
    const findUser = mockUsers.find((user)=> user.id === parsedID)
    if (!findUser) return response.sendStatus(404)
    return response.send(findUser)
})

app.get("/api/users", (request,response) =>{
    console.log(request)
    const {query:{filter,value}} = request
    if (!filter && ! value) return response.send(mockUsers) 
    if (filter && value) {
        return response.send(mockUsers.filter(user => user[filter].includes(value)))
    }
})

app.listen(PORT, ()=>{
    console.log(`Running on Port ${PORT}`)
})