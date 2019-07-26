// const mongoose = require('mongoose')
require('../src/db/mongoose')

const Task = require('../src/models/task')
 
// Task.findOneAndDelete("5d38af53d99ffe42dc6795f9").then((task) => {
//     console.log("Task deleted")
//     return  Task.countDocuments({completed:false})

// }).then(result => {
//     console.log("Result: " +  result)
// })


const deleteTaskAndCount = async (id) => {
    await Task.findOneAndDelete(id)//delete task
    return await Task.countDocuments({completed:false})//count task


}

deleteTaskAndCount("5d38b072b4a8fa097cad7b6a").then((count) => {
    console.log(count)
})