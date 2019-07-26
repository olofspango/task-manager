const express = require('express')

const User = require('../models/user')
const router = new express.Router()


router.get('/users', async (req,res) => {
    try {
        const users = await User.find({})
        console.log("Getting users")

        res.status(200).send(users)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.post('/users/login', async(req,res) => {
    // This function should find user by email and password.
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        
        res.send({user, token})
    } catch (e) {        
        console.log(e)
        res.status(400).send()
    }
})

router.get('/users/:id', async (req,res) => {
    const _id = req.params.id
    try {        
        const user = await User.findById(_id)
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch(e) {
        res.status(500).send()
    }
    console.log(req.params)
})

router.post('/users', async (req,res) => {
    console.log(req.body)
    const user = new User(req.body)
    try {      
        await user.save()
        const token = user.generateAuthToken()
        // Generate token for the saved user
        // send back both user and token

        res.status(201).send({user,token})
    } catch (e) {
        res.status(400).send(e)
    }
})


router.patch('/users/:id', async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','age','email','password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error:'Invalid updates'})
    }

    try{
        const user = await User.findById(req.params.id)
        
        updates.forEach(update => user[update] = req.body[update])
        await user.save()

        //attempt to update user by ID
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})

        if(!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)

    } catch(e) {        
        res.status(400).send(e)
    }
})


router.delete('/users/:id', async (req,res) => {
    

    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) {
            res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})



module.exports = (router)