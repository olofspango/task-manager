const mongoose = require('mongoose')
const validator = require('validator')


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

module.exports = User