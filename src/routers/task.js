const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
const auth = require('../middleware/auth')




router.post('/tasks', auth, async (req, res) => {    

    const task = new Task({
        ...req.body,
        creator:req.user._id
    })
    // const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
            res.status(400).send(e)
    }
})



router.patch('/tasks/:id', auth, async(req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error:'Invalid updates'})
    }
    try {
        const task = await Task.findOne({_id:req.params.id, creator: req.user._id})

        if(!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])

        await task.save()


        res.status(200).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req,res) => {
    try {
        const task = await Task.findOneAndDelete({_id:req.params.id, creator:req.user._id})
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

// GET /tasks?complete=true
// GET /tasks?sortBy=field_desc
router.get('/tasks', auth, async (req,res) => {
    const match = {}
    const sort = {}

    if(req.query.completed) {
        match.completed = req.query.completed === "true"
    }

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split('_')
        sort[parts[0]] = parts[1]==='desc' ? -1 : 1 // if true, -1, if not true, 1
    }

    try {
        // pagination - limit and skip GET /tasks?limit=10, ?skip=0, skip=10 (2nd page), ..        
        await req.user.populate( {
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort // : sort {createdAt : -1}
            }
        }).execPopulate()
        // const tasks = await Task.find({creator: req.user._id})
        // await req.user.populate('tasks').execPopulate() -> return req.user.tasks
        res.status(200).send(req.user.tasks)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks/:id', auth, async (req,res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({creator: req.user._id, _id})
        if(!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch( e) {
        res.status(500).send()
    }
})


module.exports = router