const express = require('express')
const app = express()
const port = process.env.PORT || 3000
require('./db/mongoose')
// const User = require('./models/user')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)





app.listen((port), () => {
    console.log('Listening on port ' + port)
})

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const myFunction = async () => {
    const token = jwt.sign({_id:"12345"}, 'thisismynewcourse', {expiresIn:'7 days'})
    console.log(token)

    const data = jwt.verify(token,'thisismynewcourse')
    console.log(data)
    
}

myFunction()