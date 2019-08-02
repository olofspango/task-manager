const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL, {
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