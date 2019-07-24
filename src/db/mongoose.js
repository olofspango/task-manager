const mongoose = require('mongoose')


mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
    useNewUrlParser: true,
    useCreateIndex : true
})








// const me = new User({
//     name:'  Ol of  ',
//     password:"knas",
//     email:" OLof.Spango@gmail.com "
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) =>  {
//     console.log(error)
// })


// const newTask = new Task({
//     description: "Vattna blommorna",
//     completed: false
// })

// newTask.save().then(() => {
//     console.log(newTask)
// }).catch((error) => {
//     console.log(error)
// })