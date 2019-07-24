const express = require('express')
const app = express()
const port = process.env.PORT || 3000
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')


app.use(express.json())

app.post('/tasks', (req, res) => {
    console.log(req.body)
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/users', (req,res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

app.get('/tasks', (req,res) => {
    Task.find({}).then((tasks) => {
        res.status(200).send(tasks)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/tasks/:id', (req,res) => {
    const _id = req.params.id
    Task.findById(_id).then((task) => {
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    }).catch((e) => {
        if(e.kind === "ObjectId" ) {
            return res.status(404).send('Invalid ID. ' + e)
        }
        res.status(500).send(e)
    })
})


app.get('/users/:id', (req,res) => {
    const _id = req.params.id
    User.findById(_id).then((user) => {
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e) => {
        if(e.kind === "ObjectId") {
            return res.status(404).send("Invalid ID. " + e)
        }
        res.status(500).send(e)
    })
    
    console.log(req.params)
})

app.post('/users', (req,res) => {
    console.log(req.body)
    const user = new User(req.body)
    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.listen((port), () => {
    console.log('Listening on port ' + port)
})


