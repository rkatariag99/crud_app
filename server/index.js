/* cors: to user server at front-end side
    app.use(express.json): to parse it to json format else error 
    app.listen(): to run server
*/

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const UserModel = require('./models/Users')

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/crud")
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

//to fetch data from api
app.get('/createUser',(req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

//for update to get existing user details in input fields already filled
app.get('/createUser/getUser/:id',(req, res) => {
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

//new route where updated values displayed
app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id}, {
    name: req.body.name, 
    email: req.body.email, 
    age: req.body.age})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

//new route for delete
app.delete('/createUser/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post("/createUser", (req, res) => { //creating api for new record using callback func app.post has req and response
    console.log("data recieved",req.body);
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is Running")
})
