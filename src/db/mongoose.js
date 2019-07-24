const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
    useNewUrlParser: true,
    useCreateIndex : true
})

const User = mongoose.model('User', {
    name: {
        type:String,
        required: true,
        trim:true
    },
    age: {
        type:Number,
        default:0,
        validate(value) {
            if(value<0) {
                throw new Error('Age must be a positive number')
            }
        },
        required: true
    },
    email: {
        type:String,
        required:true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        },
        lowercase:true,
        trim:true
    },
    password: {
        type: String,
        required:true,
        trim:true,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain password')
            }
            if(validator.isLength(value, {max:6})) {
                throw new Error('Password must be longer than 6 characters')
            }            
        }
    }
})







const me = new User({
    name:'  Ol of  ',
    password:"knas",
    email:" OLof.Spango@gmail.com "
})

me.save().then(() => {
    console.log(me)
}).catch((error) =>  {
    console.log(error)
})
const Task = mongoose.model('Task', {
    description: {
        type:String,
        trim:true,
        required:true,        
    },
    completed: {
        type: Boolean,
        default:false
    }
})

const newTask = new Task({
    description: "Vattna blommorna",
    completed: false
})

newTask.save().then(() => {
    console.log(newTask)
}).catch((error) => {
    console.log(error)
})