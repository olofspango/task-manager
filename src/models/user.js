const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// hash the plaintext pw before saving

const userSchema = new mongoose.Schema({
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
        unique:true,
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
    },
    tokens: [{
        token: {
            type: String,
            required:true
        }
    }]
})

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id:user.id.toString()}, 'mysecretstuff')

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email ,password) => {
    const user = await User.findOne({email})

    if(!user) {
        throw new Error('Unable to log in')
    }

    // verify pwd.
    const match = await bcrypt.compare(password, user.password)
    if(!match) {
        throw new Error('Unable to log in.')
    }

    return user
}



userSchema.pre('save', async function (next) {
    const user = this

    // hash the password
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User